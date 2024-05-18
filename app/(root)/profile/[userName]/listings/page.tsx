import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import FilteredListings from "./components/FilteredListings";
import { Listing } from "@/types/ListingTypes";

export async function generateMetadata({
  params,
}: {
  params: { userName: string };
}): Promise<Metadata> {
  const userName = params.userName;

  return {
    title: `Auction House | ${userName}'s Listings`,
  };
}

export default async function MyListingsPage({
  params,
}: {
  params: { userName: string };
}) {
  const isLoggedIn = cookies().get("accessToken") ? true : false;
  const accessToken = cookies().get("accessToken")?.value;
  const loggedInUser = cookies().get("userName")?.value;

  if (!isLoggedIn) {
    redirect("/login");
  }

  // Fetching the user's listings
  const url = `${process.env.API_PROFILES}/${params!.userName}/listings?_active`;
  const usersListing = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": process.env.API_KEY || "",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const { data } = usersListing;

  // Filtering out listings without images
  const listingsWithImages: Listing[] = data.filter(
    (data: Listing) => data.media.length > 0
  );

  return (
    <div className="mt-14 mb-40 px-6 md:px-10">
      <div className="">
        <h1 className="text-2xl">Listings by {params.userName}</h1>
      </div>
      <FilteredListings
        data={listingsWithImages}
        loggedInUser={loggedInUser ?? ""}
      />
    </div>
  );
}
