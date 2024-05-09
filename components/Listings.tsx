"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

import { ListingsProps } from "../types/ListingTypes";
import { getTimeLeft } from "@/lib/time-converter";
import { filteringOptions } from "@/lib/filtering-options";
import { Button } from "./Button";

export default function Listings({ data }: ListingsProps) {
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState("all");
  const [selectedLabel, setSelectedLabel] = useState("All");

  useEffect(() => {
    if (filter === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.tags.includes(filter));
      setFilteredData(filtered);
    }
  }, [filter, data]);

  return (
    <>
      <div className="h-10 flex items-center overflow-x-scroll no-scrollbar space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 px-6 md:px-10 md:justify-around">
        {filteringOptions.map((option) => (
          <Button
            variant="secondary"
            rounded="full"
            key={option.value}
            value={option.value}
            onClick={() => {
              setFilter(option.value);
              setSelectedLabel(option.label);
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {filteredData.length ? (
        <div className="px-6 md:px-10 mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map(({ id, title, _count, media, endsAt }) => (
            <Link key={id} href={`/listing/${id}`} className="relative">
              {media.length > 0 && (
                <img
                  src={media[0].url}
                  alt={media[0].alt}
                  className="h-52 w-full object-cover bg-slate-100 rounded-lg"
                />
              )}
              <div className="py-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="absolute top-44 right-2 rounded-full text-sm bg-white border py-0.5 px-3">
                  {_count.bids} bids
                </p>
                <div className="absolute flex justify-center items-center top-2 right-2 rounded-full text-sm bg-white border p-1 cursor-pointer group">
                  <Heart className="size-5 text-slate-800 transition-all group-hover:text-red-500" />
                </div>
                <p className="text-sm">{getTimeLeft(endsAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex text-lg px-6 md:px-10 mt-14 justify-center">
          No listings found for
          <div className="lowercase ml-2">'{selectedLabel}' tag.</div>
        </div>
      )}
    </>
  );
}
