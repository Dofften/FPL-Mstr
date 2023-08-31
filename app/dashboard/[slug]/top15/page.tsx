import PlayerItem from "@/components/PlayerItem";
import pitch from "../../../../public/pitch.svg";

async function getData(x: number) {
  const res = await fetch(`http://localhost:3000/api/fpl/${x}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getFixtures() {
  const res = await fetch("http://localhost:3000/api/fixtures");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Helper function to get player position based on element type
function getPlayerPosition(elementType: number): string {
  if (elementType === 1) {
    return "Goalkeeper";
  } else if (elementType === 2) {
    return "Defender";
  } else if (elementType === 3) {
    return "Midfielder";
  } else if (elementType === 4) {
    return "Forward";
  } else {
    return "";
  }
}

// Helper function to get player fixtures for a specific gameweek
function getPlayerFixtures(
  player: any,
  gameweek: number,
  fixtures: any
): string {
  return fixtures
    .filter(
      (fixture: any) =>
        fixture.event === gameweek &&
        (fixture.team_name_a === player.team_name ||
          fixture.team_name_h === player.team_name)
    )
    .map((fixture: any) => {
      if (fixture.team_name_h === player.team_name) {
        return `${fixture.team_short_name_a} (H)`;
      } else if (fixture.team_name_a === player.team_name) {
        return `${fixture.team_short_name_h} (A)`;
      }
      return null;
    });
}

// Helper function to get player captain status
function getPlayerCaptainStatus(player: any): string {
  if (player.is_captain) {
    return "C";
  } else if (player.is_vice_captain) {
    return "V";
  } else {
    return "";
  }
}

// Helper function to get player news
function getPlayerNews(player: any): string | null {
  return player.news !== "" ? player.news : null;
}

export default async function page({ params }: { params: { slug: number } }) {
  const data = await getData(params.slug);
  const fixtures = await getFixtures();
  const gameweek = 4;

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div
          className="p-4 md:mr-2 md:border-r-2 md:w-[500px] lg:w-[600px]"
          style={{
            backgroundImage: `url(${pitch.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 1 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 2 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 3 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 4 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around mt-2 pb-1 bg-[#72cf9fe6]/60 rounded-md">
            {data
              .filter((player: any) => player.position > 11)
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
        </div>

        <div
          className="p-4 md:ml-2 md:border-l-2 md:w-[500px] lg:w-[600px]"
          style={{
            backgroundImage: `url(${pitch.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 1 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 2 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 3 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around">
            {data
              .filter(
                (player: any) =>
                  player.element_type === 4 && player.position <= 11
              )
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
          <div className="flex justify-around mt-2 pb-1 bg-[#72cf9fe6]/60 rounded-md">
            {data
              .filter((player: any) => player.position > 11)
              .map((player: any) => (
                <PlayerItem
                  elementName={player.web_name}
                  team={player.team_name}
                  position={getPlayerPosition(player.element_type)}
                  now_cost={player.now_cost}
                  fixture={getPlayerFixtures(player, gameweek, fixtures)}
                  fixture1={getPlayerFixtures(player, gameweek + 1, fixtures)}
                  fixture2={getPlayerFixtures(player, gameweek + 2, fixtures)}
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={getPlayerCaptainStatus(player)}
                  news={player.news != "" ? player.news : null}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
