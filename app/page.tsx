import { revalidatePath } from "next/cache";

import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
import { Listing } from "@/types/ListingTypes";

const baseUrl =
  process.env.API_ALL_LISTINGS + "?_bids=true&_seller=true&_active=true";

// Fetching all pages of data from the API and returning a flat array of all the data
async function fetchAllPages(baseUrl: string, totalPages: number) {
  const pagePromises = [];
  for (let page = 1; page <= totalPages; page++) {
    pagePromises.push(
      fetch(`${baseUrl}&page=${page}`).then((res) => res.json())
    );
  }
  const pages = await Promise.all(pagePromises);
  return pages.flatMap((page) => page.data);
}

export default async function Home() {
  // Fetching the first page of data to get the total number of pages
  const initialData = await fetch(`${baseUrl}&page=1`).then((res) =>
    res.json()
  );
  const totalPages = initialData.meta.pageCount;
  const allData = await fetchAllPages(baseUrl, totalPages);

  // Sorting the data by date and filtering out listings without images
  const sortedDataWithImages: Listing[] = allData
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
