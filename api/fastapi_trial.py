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
        gameweek (int) : Specific gameweek
    """
    base_url = "https://fantasy.premierleague.com/api/entry/"
    full_url = base_url + str(entry_id) + "/event/" + str(gameweek) + "/picks/"
    response = requests.get(full_url)
    response.raise_for_status()
    data = response.json()
    team_picks = pd.DataFrame(data["picks"])
    return team_picks.merge(
        get_player_data()[
            ["id", "web_name", "now_cost", "event_points", "element_type", "form", "selected_by_percent", "news", "team"]
        ],
        left_on="element",
        right_on="id",
    )


def get_game_data():
    """Retrieve the gw-by-gw data

    credit: vaastav/Fantasy-Premier-League/getters.py

    """
    response = requests.get("https://fantasy.premierleague.com/api/bootstrap-static/")
    response.raise_for_status()
    data = response.json()
    return data


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