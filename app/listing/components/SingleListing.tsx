"use client";

import { Button } from "@/components/Button";
import useTimeLeft from "@/hooks/useTimeLeft";
import { Listing } from "@/types/ListingTypes";
import { useState } from "react";

export default function SingleListing({ data }: { data: Listing }) {
  const [showAllImages, setShowAllImages] = useState(false);

  const { title, description, media, tags, created, endsAt, bids, seller } =
    data;

  const timeLeft = useTimeLeft(endsAt);

  const bidAmount = bids && bids.length > 0 ? bids[0].amount : 0;
  const enterBid = bidAmount + 1;

  const toggleImagesDisplay = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <div className="grid grid-cols-5 md:gap-x-10 xl:gap-x-20">
      <div className="md:col-span-3">
        <h1 className="px-20 text-5xl font-medium font-seri pb-10">{title}</h1>
        <img
          src={media[0].url}
          alt={media[0].alt}
          className="w-full rounded-md object-fill"
        />
        {showAllImages && (
          <div>
            {media.map(
              (img, index) =>
                index !== 0 && (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.alt}
                    className="w-full rounded-md object-fill my-4"
                  />
                )
            )}
          </div>
        )}
        <div className="my-6 flex justify-center">
          {media.length > 1 && (
            <Button
              size="wider"
              variant="outline"
              onClick={toggleImagesDisplay}
            >
              {showAllImages ? "See less" : "See all images"}
            </Button>
          )}
        </div>
      </div>
      <div className="hidden md:block col-span-2">
        <div className="px-10">{timeLeft}</div>
        <div className="mt-4 border border-gray-300 border-t-2 border-t-black rounded-md py-6 px-4">
          <div className="flex flex-col">
            <div className="uppercase text-sm text-gray-800 font-light">
              Current Bid
            </div>
            <div className="text-xl font-medium">{bidAmount} credits</div>
          </div>
          <form className="my-10">
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="w-full">
                1 credit
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                5 credits
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                20 credits
              </Button>
            </div>
            <div className="my-4">
              <input
                placeholder={`${enterBid} or more credits`}
                className="w-full rounded-md border-0 mt-1 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-500 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
              <Button size="wider" className="mt-4">
                Place bid
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
