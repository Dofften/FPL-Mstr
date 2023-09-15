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
    try:
        top250df = pd.read_pickle(f"top250_gw{gameWeek}.pkl")
    except FileNotFoundError:
        # adds the top team ID's to this array
        teamIDarray_all = []

        urls = ["https://fantasy.premierleague.com/api/leagues-classic/314/standings/",
                "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=2",
                "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=3",
                "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=4",
                "https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_standings=5"]

        managerParsed_all=[]
        for url in urls:
            response = requests.get(url)
            data = response.text
            parsed = json.loads(data)
            managerParsed_all.append(parsed['standings']['results'])

        final_dataframe_all = pd.DataFrame()

        #get csv of top 15 manager information and write to top_managers.csv
        for page in managerParsed_all:
            for manager in page:
                teamIDarray_all.append(manager['entry'])

        def update_dictionary_key(dictionary, key):
            if key in dictionary:
                dictionary[key] += 1
            else:
                dictionary[key] = 1

        count_dict_all = {}
        # for each teamID in the top 15, call the api and update both top_managers_gwInfo.csv and top_managers_gwPicks.csv
        for teamID in teamIDarray_all:
            # Call the get_team_data function
            team_data_all = get_team_data(teamID, gameWeek)
            for _, x in team_data_all.iterrows():
                update_dictionary_key(count_dict_all, x['id'])
            # Append the team_data to the final_dataframe
            final_dataframe_all = pd.concat([final_dataframe_all, team_data_all])
        
        # Create a new 'frequency' column using list comprehension
        final_dataframe_all['top_ownership'] = final_dataframe_all['id'].apply((lambda x: count_dict_all.get(x, 0)*0.4))
        
        # Remove duplicate rows
        df_unique = final_dataframe_all.drop_duplicates(subset=['web_name'] ,keep='first')
        
        top250df = SolveLP(df_unique, {"Forwards":3,"Midfielders":5,"Defenders":5, "Goalkeepers": 2}, 3, 1000)

        top250df.to_pickle(f"top250_gw{gameWeek}.pkl")

    return top250df


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
async def top_FPL_managers():
    top_team = top_managers()
    top_team=top_team.merge(get_club_data()[['team_code','team_id','team_name','team_short_name']], left_on='team', right_on='team_id')
    return top_team.to_dict(orient="records")