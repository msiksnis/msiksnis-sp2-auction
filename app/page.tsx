import FilteringBar from "@/components/FilteringBar";
import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
import { Listing } from "@/types/ListingTypes";
import { revalidatePath } from "next/cache";

const url =
  process.env.API_ALL_LISTINGS +
  "?_bids=true&_seller=true&limit=100&_active=true";
export default async function Home() {
  const allListings = await fetch(url);

  const { data } = await allListings.json();

  const sortedDataWithImages: Listing[] = data
    .filter((data: Listing) => data.media.length > 0)
    .sort(
      (a: any, b: any) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    );

  revalidatePath("/");

  return (
    <>
      <Hero />
      <div className="mt-28 mb-40 sm:mt-36 md:mt-44 xl:mt-52">
        <Listings data={sortedDataWithImages} />
      </div>
    </>
  );
}
