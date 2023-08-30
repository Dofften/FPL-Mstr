from fastapi import FastAPI

app = FastAPI()

########### FPL ###############

import pandas as pd
import requests


def get_team_data(entry_id, gameweek):
    """Retrieve the gw-by-gw data for a specific entry/team

    credit: vaastav/Fantasy-Premier-League/getters.py

    Args:
        entry_id (int) : ID of the team whose data is to be retrieved
    """
    base_url = "https://fantasy.premierleague.com/api/entry/"
    full_url = base_url + str(entry_id) + "/event/" + str(gameweek) + "/picks/"
    response = requests.get(full_url)
    response.raise_for_status()
    data = response.json()
    team_picks = pd.DataFrame(data["picks"])
    return team_picks.merge(
        get_player_data()[
            ["id", "web_name", "team", "now_cost", "event_points", "element_type", "form", "selected_by_percent", "news"]
        ],
        left_on="element",
        right_on="id",
    )


def get_game_data():
    response = requests.get("https://fantasy.premierleague.com/api/bootstrap-static/")
    response.raise_for_status()
    data = response.json()
    return data


def get_gameweek_data():
    return pd.DataFrame(get_game_data()["events"])


def get_player_data():
    return pd.DataFrame(get_game_data()["elements"])


def get_club_data():
    # return pd.DataFrame(get_game_data()["teams"])
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

# def get_fixtures_data():
#     fixtures = pd.read_csv("https://raw.githubusercontent.com/vaastav/Fantasy-Premier-League/master/data/2023-24/fixtures.csv")
#     teams = get_club_data()
#     # Assuming you have already defined fixtures_df and teams_df
#     # You can use   the merge function to join them on the id column
#     combined_df = pd.merge(fixtures, teams, left_on='team_a', right_on='team_id', how='left', suffixes=('_a', '_h'))
#     # This will add the name and shortname columns from teams_df to fixtures_df for team_a
#     # You can repeat the same process for team_h
#     combined_df = pd.merge(combined_df, teams, left_on='team_h', right_on='team_id', how='left', suffixes=('_a', '_h'))
#     # This will add the name and shortname columns from teams_df to combined_df for team_h
#     # You can drop the extra id columns if you don't need them
#     combined_df = combined_df.drop(columns=['id_a', 'id_h'])
#     return combined_df


# Create a function to filter fixtures based on team
def filter_fixtures(row):
    team = row['team']
    fixtures = pd.read_csv("https://raw.githubusercontent.com/vaastav/Fantasy-Premier-League/master/data/2023-24/fixtures.csv")
    teams = get_club_data()
    combined_df = pd.merge(fixtures, teams, left_on='team_a', right_on='team_id', how='left', suffixes=('_a', '_h'))
    combined_df = pd.merge(combined_df, teams, left_on='team_h', right_on='team_id', how='left', suffixes=('_a', '_h'))
    combined_df = combined_df.drop(columns=['team_id_a', 'team_id_h'])
    fixtures_final = combined_df[['event','team_a','team_a_score','team_h','team_h_score','team_h_difficulty','team_a_difficulty','team_code_a','team_name_a','team_short_name_a','team_code_h','team_name_h','team_short_name_h']]
    team_fixtures = fixtures_final[(fixtures_final['team_h'] == team) | (fixtures_final['team_a'] == team)]
    fixtures_list = []
    for _, fixture_row in team_fixtures.iterrows():
        fixture_dict = {
            'team_h': fixture_row['team_h'],
            'team_a': fixture_row['team_a'],
            'event': fixture_row['event'],
            'team_h_difficulty': fixture_row['team_h_difficulty'],
            'team_a_difficulty': fixture_row['team_a_difficulty'],
            'team_code_a':fixture_row['team_code_a'],
            'team_code_h':fixture_row['team_code_h'],
            'team_name_a': fixture_row['team_name_a'],
            'team_name_h': fixture_row['team_name_h'],
            'team_short_name_a': fixture_row['team_short_name_a'],
            'team_short_name_h': fixture_row['team_short_name_h'],
        }
        fixtures_list.append(fixture_dict)
    return fixtures_list

###############################

@app.get("/api/fpl")
def fpl_team():
    team_id = 832519
    team_data = get_team_data(team_id, gameweek=get_current_gameweek())
    team_data=team_data.merge(get_club_data()[['team_code','team_id','team_name','team_short_name']], left_on='team', right_on='team_id')
    # Apply the function to create the 'fixtures' column
    # fixtures = pd.read_csv("https://raw.githubusercontent.com/vaastav/Fantasy-Premier-League/master/data/2023-24/fixtures.csv")
    # teams = pd.read_csv("https://raw.githubusercontent.com/vaastav/Fantasy-Premier-League/master/data/2023-24/teams.csv")
    # teams.rename(columns={'id':'team_id', 'code':'team_code','name':'team_name','short_name':'team_short_name'}, inplace = True)
    # # Assuming you have already defined fixtures_df and teams_df
    # # You can use the merge function to join them on the id column
    # combined_df = pd.merge(fixtures, teams, left_on='team_a', right_on='team_id', how='left', suffixes=('_a', '_h'))
    # # This will add the name and shortname columns from teams_df to fixtures_df for team_a
    # # You can repeat the same process for team_h
    # combined_df = pd.merge(combined_df, teams, left_on='team_h', right_on='team_id', how='left', suffixes=('_a', '_h'))
    # # This will add the name and shortname columns from teams_df to combined_df for team_h
    # # You can drop the extra id columns if you don't need them
    # combined_df = combined_df.drop(columns=['team_id_a', 'team_id_h'])
    # # Now you have a combined dataframe with all the information you need
    # fixtures_final = combined_df[['event','team_a','team_a_score','team_h','team_h_score','team_h_difficulty','team_a_difficulty','team_code_a','team_name_a','team_short_name_a','team_code_h','team_name_h','team_short_name_h']]
    #########
    team_data['fixtures'] = team_data.apply(filter_fixtures, axis=1)
    return team_data.to_dict(orient="records")