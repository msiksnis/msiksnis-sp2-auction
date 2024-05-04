import FilteringBar from "@/components/FilteringBar";
import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
import { revalidatePath } from "next/cache";

const url =
  process.env.API_ALL_LISTINGS + "?_seller=true&_bids=true&_active=true";

export default async function Home() {
  const allListings = await fetch(url);

  const { data } = await allListings.json();

  const sortedData = data.sort(
    (a: any, b: any) =>
      new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  revalidatePath("/");

  return (
    <>
      <Hero />
      <div className="mt-28 sm:mt-36 md:mt-44 xl:mt-52">
        <FilteringBar />
      </div>
      <Listings data={sortedData} />
    </>
  );
}
