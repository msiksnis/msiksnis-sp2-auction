import { cookies } from "next/headers";

import { Listing } from "@/types/ListingTypes";
import ActiveBids from "./components/ActiveBids";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { userName: string };
}): Promise<Metadata> {
  const userName = params.userName;

  return {
    title: `Auction House | ${userName}'s Active Bids`,
  };
}

interface Bid {
  id: string;
  amount: number;
  listing: Listing;
  bidder: {
    name: string;
    email: string;
    bio: string;
    avatar: object;
    banner: object;
  };
  created: string;
}

interface ActiveBidsPageProps {
  params: { userName: string };
}

export default async function ActiveBidsPage({ params }: ActiveBidsPageProps) {
  const accessToken = cookies().get("accessToken")?.value;
  const url =
    process.env.API_PROFILES + `/${params.userName}/bids?_listings=true`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": process.env.API_KEY || "",
      "Content-Type": "application/json",
    },
  });

  const { data: bids } = await res.json();

  // This filters out only the active bids and only the highest bid per listing
  const activeBids = bids
    .filter((bid: Bid) => new Date(bid.listing.endsAt) > new Date())
    .reduce((acc: Bid[], bid: Bid) => {
      const existingBid = acc.find((b) => b.listing.id === bid.listing.id);
      if (!existingBid || bid.amount > existingBid.amount) {
        return [...acc.filter((b) => b.listing.id !== bid.listing.id), bid];
      }
      return acc;
    }, []);

  return (
    <div className="px-6 md:px-10 mt-10 mb-40">
      <div className="text-2xl md:text-3xl font-medium">My Active Bids</div>
      <ActiveBids activeBids={activeBids} />
    </div>
  );
}
