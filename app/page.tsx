import Banner from "@/components/Banner";
import SmallCard from "@/components/SmallCard";

export interface Data {
  img: string;
  location: string;
  distance: string;
}

export default async function Home() {
  const res = await fetch("https://www.jsonkeeper.com/b/4G1G", {
    cache: "no-cache",
  });

  const exploreData: Data[] = await res.json();

  return (
    <div>
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pd-5">
            Access Cutting Edge Analytics
          </h2>

          {/* Pull some data from a server - API */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              <SmallCard
                key={item.img}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
