import FilteringBar from "@/components/FilteringBar";
import Hero from "@/components/Hero";
import Listings from "@/components/Listings";

const url = process.env.API_ALL_LISTINGS + "?_seller=true&_bids=true";

export default async function Home() {
  const allListings = await fetch(url);

  const { data } = await allListings.json();

  return (
    <>
      <Hero />
      <div className="mt-28 sm:mt-36 md:mt-44 xl:mt-52">
        <FilteringBar />
      </div>
      <Listings data={data} />
    </>
  );
}
