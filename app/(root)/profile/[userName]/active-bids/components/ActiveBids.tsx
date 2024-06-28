"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getTimeLeft } from "@/lib/time-converter";
import Loading from "@/app/loading";
import FavoriteButton from "@/components/FavoriteButton";
import { Listing } from "@/types/ListingTypes";

interface Bid {
  id: string;
  amount: number;
  listing: {
    id: string;
    title: string;
    media: {
      url: string;
      alt: string;
    }[];
    endsAt: string;
  };
}

export default function ActiveBids({ activeBids }: { activeBids: Bid[] }) {
  const [listingsWithMedia, setListingsWithMedia] = useState<
    (Listing & { amount: number })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListingsWithMedia = async () => {
      try {
        const listings = await Promise.all(
          activeBids.map(async (bid) => {
            const res = await axios.get(`/api/listings/${bid.listing.id}`);
            return { ...res.data.data, amount: bid.amount };
          })
        );
        setListingsWithMedia(listings);
      } catch (error) {
        console.error("Error fetching listings with media:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListingsWithMedia();
  }, [activeBids]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : listingsWithMedia.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listingsWithMedia.map(
            ({ id, title, media, _count, endsAt, amount }) => (
              <Link key={id} href={`/listing/${id}`} className="relative">
                {media.length > 0 && (
                  <img
                    src={media[0].url}
                    alt={media[0].alt}
                    className="h-52 w-full object-cover bg-slate-100 rounded-lg"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                  />
                )}
                <div className="py-2">
                  <h2 className="text-lg font-semibold overflow-hidden truncate first-letter:capitalize">
                    {title}
                  </h2>
                  <p className="absolute top-44 right-2 rounded-full text-sm bg-white border py-0.5 px-3">
                    {_count.bids} bids
                  </p>
                  <div className="flex flex-col text-sm">
                    <p className="">{getTimeLeft(endsAt)}</p>
                    <p className="">My bid: {amount} credits</p>
                  </div>
                </div>
                <FavoriteButton id={id} />
              </Link>
            )
          )}
        </div>
      ) : (
        <div className="md:text-lg text-center mt-10">
          You have no active bids yet.
        </div>
      )}
    </div>
  );
}
