This is a [Next.js](https://nextjs.org/) and [FastAPI](https://fastapi.tiangolo.com/) webapp to provide useful analytics to FPL Managers. It recommends transfers, compares managers' teams to team selected by AI, compares managers' teams to top 15 FPL managers and also makes predictions on player points.

## Getting Started

First install FastAPI:

```bash
pip install fastapi
pip install "uvicorn[standard]"
```

Then, run the fastAPI development server:

```bash
cd api
uvicorn fastapi_trial:app --reload
```

Then, run the Nextjs development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


Visit [http://localhost:3000/dashboard/your-team-id](http://localhost:3000/dashboard/your-team-id) with your browser to see your dashboard.

### How to get team ID
- Log in to [FPL](https://fantasy.premierleague.com/) and navigate to the points page/gameweek history page.
- The URL will have a unique number between /entry/ and /event/ which is your FPL team ID.
- You need to do this via a browser on a mobile/tablet/laptop/desktop.


## ToDo
- [x] Create user dashboard
- [x] Fetch user data from FPL API
- [ ] Preprocess user data
- [x] Fetch fixture and team data
- [ ] Create a data pipeline to store fetched data locally and use that until next update
- [ ] Add analytics data to user's dashboard
- [ ] Create a dynamic table with all players' data
- [ ] Add search function to table
- [ ] Create Model to predict player performances
- [ ] Create team using best players according to predictions
- [ ] Create an FPL team using top 15 FPL managers' data