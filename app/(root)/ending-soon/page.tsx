import { revalidatePath } from "next/cache";

import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
import { Listing } from "@/types/ListingTypes";

const baseUrl =
  process.env.API_ALL_LISTINGS + "?_bids=true&_seller=true&_active=true";

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

export default async function EndingSoonPage() {
  const initialData = await fetch(`${baseUrl}&page=1`).then((res) =>
    res.json()
  );
  const totalPages = initialData.meta.pageCount;
  const allData = await fetchAllPages(baseUrl, totalPages);

  const sortedDataWithImages: Listing[] = allData
    .filter((data: Listing) => data.media.length > 0)
    .sort(
      (a: any, b: any) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    );

  const endingSoonData = sortedDataWithImages.filter(
    (item) =>
      new Date(item.endsAt).getTime() > new Date().getTime() &&
      new Date(item.endsAt).getTime() - new Date().getTime() <=
        2 * 24 * 60 * 60 * 1000 // 48 hours
  );

  revalidatePath("/");

  console.log(endingSoonData);

  return (
    <>
      <Hero />
      <div className="mt-28 mb-40 sm:mt-36 md:mt-44 xl:mt-52">
        <Listings data={endingSoonData} />
      </div>
    </>
  );
}
