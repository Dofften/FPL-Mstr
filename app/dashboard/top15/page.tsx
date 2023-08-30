import PlayerItem from "@/components/PlayerItem";
import pitch from "../../../public/pitch.svg";

async function getData() {
  const res = await fetch("http://localhost:3000/api/fpl");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page() {
  const data = await getData();

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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
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
                  position={
                    player.element_type == 1
                      ? "Goalkeeper"
                      : player.element_type == 2
                      ? "Defender"
                      : player.element_type == 3
                      ? "Midfielder"
                      : player.element_type == 4
                      ? "Forward"
                      : ""
                  }
                  now_cost={player.now_cost}
                  fixture="{player.fixture}"
                  form={player.form}
                  selected_by_percent={player.selected_by_percent}
                  predictedPoints={player.event_points}
                  captain={
                    player.is_captain ? "C" : player.is_vice_captain ? "V" : ""
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
