from fastapi import FastAPI
# from fuzzywuzzy import fuzz, process
import csv, json
import pulp

app = FastAPI()

########### FPL ###############

import pandas as pd
import requests


# Overall FPL league ID, 314 for 2019/20 season.
overallLeagueID = 314
# overall league
overall_league_url = "https://fantasy.premierleague.com/api/leagues-classic/"+str(overallLeagueID)+"/standings/"

# Fetch the game data once and use it across the application
try:
    game_data = requests.get("https://fantasy.premierleague.com/api/bootstrap-static/").json()
except requests.exceptions.RequestException as e:
    print(e)
    game_data = None

def load_top250_local_data(gameweek):
    try:
        with open(f"top250_gw{gameweek}.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return None

def save_top250_local_data(gameweek, data):
    with open(f"top250_gw{gameweek}.json", "w") as file:
        json.dump(data.to_dict(), file)


def get_team_data(entry_id, gameweek):
    """Retrieve the gw-by-gw data for a specific entry/team

    credit: vaastav/Fantasy-Premier-League/getters.py

    Args:
        entry_id (int) : ID of the team whose data is to be retrieved
        gameweek (int) : Specific gameweek
    """
    base_url = "https://fantasy.premierleague.com/api/entry/"
    full_url = base_url + str(entry_id) + "/event/" + str(gameweek) + "/picks/"
    response = requests.get(full_url)
    response.raise_for_status()
    data = response.json()
    team_picks = pd.DataFrame(data["picks"])
    team_picks = team_picks.merge(
        get_player_data()[
            ["id", "web_name", "now_cost", "event_points", "element_type", "form", "selected_by_percent", "news", "team", "photo"]
        ],
        left_on="element",
        right_on="id",
    )
    team_picks['photo'] = team_picks['photo'].str.replace('.jpg', '.png', regex=False)
    return team_picks


def get_game_data():
    """Retrieve the gw-by-gw data

    credit: vaastav/Fantasy-Premier-League/getters.py

    """
    return game_data


def get_gameweek_data():
    return pd.DataFrame(get_game_data()["events"])


def get_player_data():
    return pd.DataFrame(get_game_data()["elements"])


def get_club_data():
    teams = pd.read_csv("https://raw.githubusercontent.com/vaastav/Fantasy-Premier-League/master/data/2023-24/teams.csv")
    teams.rename(columns={'id':'team_id', 'code':'team_code','name':'team_name','short_name':'team_short_name'}, inplace = True)
    return teams
    


def get_current_gameweek():
    gameweeks = get_gameweek_data()
    try:
        current = gameweeks[gameweeks["is_current"]].iloc[-1]["id"]
    except IndexError:  # catch gameweek 0
        current = gameweeks[gameweeks["is_next"]].iloc[-1]["id"] - 1
    return current

def get_fixtures_data():
    fixtures = pd.read_csv("https://raw.githubusercontent.com/vaastav/Fantasy-Premier-League/master/data/2023-24/fixtures.csv")
    teams = get_club_data()
    combined_df = pd.merge(fixtures, teams, left_on='team_a', right_on='team_id', how='left', suffixes=('_a', '_h'))
    combined_df = pd.merge(combined_df, teams, left_on='team_h', right_on='team_id', how='left', suffixes=('_a', '_h'))
    combined_df = combined_df.drop(columns=['team_id_a', 'team_id_h'])
    return combined_df

def SolveLP(df, SquadComposition, MaxElementsPerTeam, BudgetLimit):
# Get a list of players
  players = list(df['web_name'])
  # Initialize Dictionaries for Salaries and Positions
  cost = dict(zip(players, df['now_cost']))
  positions = dict(zip(players, df['element_type']))
  teams=dict(zip(players, df['team']))
  # Dictionary for Projected Score for each player
  project_points = dict(zip(players, df['top_ownership']))
  # Set Players to Take either 1 or 0 values (owned or not)
  player_vars = pulp.LpVariable.dicts("Player", players, lowBound=0, upBound=1, cat='Integer')

  total_score = pulp.LpProblem("FPL Best Team", pulp.LpMaximize)
  total_score += pulp.lpSum([project_points[i] * player_vars[i] for i in player_vars])
  total_score += pulp.lpSum([cost[i] * player_vars[i] for i in player_vars]) <= BudgetLimit
  # Get indices of players for each position
  fwd = [p for p in positions.keys() if positions[p] == 4]
  defD = [p for p in positions.keys() if positions[p] == 3]
  mid = [p for p in positions.keys() if positions[p] == 2]
  gk = [p for p in positions.keys() if positions[p] == 1]
  # Set Constraints
  total_score += pulp.lpSum([player_vars[i] for i in fwd]) == SquadComposition["Forwards"]
  total_score += pulp.lpSum([player_vars[i] for i in defD]) == SquadComposition["Defenders"]
  total_score += pulp.lpSum([player_vars[i] for i in mid]) == SquadComposition["Midfielders"]
  total_score += pulp.lpSum([player_vars[i] for i in gk]) == SquadComposition["Goalkeepers"]


  # Teams constraints
  for k in list(df["team"].unique()):
    teamTMP=[p for p in teams.keys() if teams[p] == k]
    total_score += pulp.lpSum([player_vars[i] for i in teamTMP]) <= MaxElementsPerTeam

  total_score.solve(pulp.PULP_CBC_CMD(msg=False))

  playersTeam=[]
  for v in total_score.variables():
    if v.varValue > 0:
      playersTeam.append(v.name.replace("Player_r_","").replace("_", " ").replace("Player ",""))
    #   print(v.name.replace("Player_r_","").replace("_", " ").replace("Player ",""))

  dfPlayers=pd.DataFrame(playersTeam)
  dfPlayers.columns=["name"]

  merged_df = df.merge(dfPlayers, left_on='web_name', right_on='name', how='inner')
  merged_df = merged_df.drop(columns=['name'])
  return merged_df

def top_managers():
    
    gameWeek = get_current_gameweek()
    ## Check if local data exists for the current gameweek
    local_data = load_top250_local_data(gameWeek)
    if local_data:
        df_unique = pd.DataFrame.from_dict(local_data)
    else:
        urls = [
            "https://fantasy.premierleague.com/api/leagues-classic/314/standings/",
            "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=2",
            "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=3",
            "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=4",
            "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=5"
        ]

        # Fetch all manager data at once
        manager_data = [requests.get(url).json()['standings']['results'] for url in urls]

        # Flatten the list of lists into a single list
        manager_data = [manager for sublist in manager_data for manager in sublist]

        # Create teamIDarray_all using list comprehension
        teamIDarray_all = [manager['entry'] for manager in manager_data]

        # Fetch all team data at once
        team_data_all = [get_team_data(teamID, gameWeek) for teamID in teamIDarray_all]

        # Flatten the list of dataframes into a single dataframe
        final_dataframe_all = pd.concat(team_data_all)

        # Create count_dict_all using pandas value_counts function
        count_dict_all = final_dataframe_all['id'].value_counts().to_dict()

        # Add 'top_ownership' column to the dataframe
        final_dataframe_all['top_ownership'] = final_dataframe_all['id'].apply(lambda x: count_dict_all.get(x, 0)*0.4)

        # Remove duplicate rows
        df_unique = final_dataframe_all.drop_duplicates(subset=['web_name'])
        
        # Save the fetched data to a local file for the current gameweek
        save_top250_local_data(gameWeek, df_unique)

    top250df = SolveLP(df_unique, {"Forwards":3,"Midfielders":5,"Defenders":5, "Goalkeepers": 2}, 3, 1000)


    return top250df


# def load_sofifa():
#     sofifadf = pd.read_csv("player_data_full.csv",usecols=["name","full_name","short_name","description","image"])
#     return sofifadf
# # Define a function to find the closest match
# sofifadf = load_sofifa()
# def find_closest_match(row):
#     player_name = row['web_name']
#     # sofifadf = load_sofifa()
#     matches = process.extractOne(player_name, sofifadf['name'], scorer=fuzz.partial_ratio)
    
#     # Check if the match is above a certain similarity threshold (e.g., 80)
#     if matches[1] >= 85:
#         matching_name = matches[0]
#         image_url = sofifadf.loc[sofifadf['name'] == matching_name, 'image'].values[0]
#         return image_url
#     else:
#         return "https://cdn.sofifa.net/player_0.svg"



@app.get("/api/fixtures")
def fixtures():
    fixtures = get_fixtures_data()
    fixtures['event'] = fixtures['event'].fillna(0)
    fixturesdf = fixtures[['code','event','id','team_a','team_h','team_a_difficulty','team_h_difficulty','team_code_a', 'team_code_h','team_name_a','team_name_h','team_short_name_a','team_short_name_h']]
    return fixturesdf.to_dict(orient="records")
    

@app.get("/api/fpl/{team_id}")
def fpl_team(team_id):
    team_data = get_team_data(team_id, gameweek=get_current_gameweek())
    team_data=team_data.merge(get_club_data()[['team_code','team_id','team_name','team_short_name']], left_on='team', right_on='team_id')
    return team_data.to_dict(orient="records")

@app.get("/api/fpl/{team_id}/top250")
def top_FPL_managers(team_id):
    top_team = top_managers()
    top_team=top_team.merge(get_club_data()[['team_code','team_id','team_name','team_short_name']], left_on='team', right_on='team_id')
    # top_team = pd.read_csv("top_team.csv")
    return top_team.to_dict(orient="records")