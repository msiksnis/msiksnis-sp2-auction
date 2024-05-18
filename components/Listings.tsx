"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { ListingsProps } from "../types/ListingTypes";
import { getTimeLeft } from "@/lib/time-converter";
import { Button } from "./Button";
import useTopTags from "@/hooks/useTopTags";
import Loading from "@/app/loading";
import FavoriteButton from "./FavoriteButton";

export default function Listings({ data }: ListingsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topTags = ["All", ...useTopTags(data)].filter((tag) => tag);

  const [filteredData, setFilteredData] = useState(data);
  const filterParam = searchParams.get("filter") || "all";
  const [selectedFilter, setSelectedFilter] = useState(filterParam);
  const [activeButton, setActiveButton] = useState(filterParam);
  const [isLoading, setIsLoading] = useState(false);

  // Handle filter change and update the filtered data
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    router.push(filter === "All" ? `?` : `?filter=${filter}`, {
      scroll: false,
    });
    setIsLoading(true);
    if (filter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.tags.includes(filter)));
    }
    setActiveButton(filter);
  };

  // Filter the data based on the filterParam
  useEffect(() => {
    if (filterParam === "all" || filterParam === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) => item.tags.length > 0 && item.tags.includes(filterParam)
      );
      setFilteredData(filtered);
    }
    setIsLoading(false);
  }, [filterParam, data]);

  // Set the active button based on the filterParam
  useEffect(() => {
    setActiveButton(
      filterParam === "all" || !filterParam ? "All" : filterParam
    );
  }, [filterParam]);

  return (
    <>
      <div className="h-10 flex items-center overflow-x-scroll no-scrollbar space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 px-6 md:px-10">
        {topTags.map((option) => (
          <Button
            variant="secondary"
            rounded="full"
            key={option || ""}
            value={option || ""}
            onClick={() => {
              handleFilterChange(option || "");
            }}
            className={`capitalize ${
              activeButton === option ? "border border-slate-800" : ""
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : filteredData.length ? (
        <div className="px-6 md:px-10 mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map(({ id, title, _count, media, endsAt }, index) => (
            <div key={index} className="relative">
              <Link href={`/listing/${id}`} className="block">
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
                  <p className="text-sm">{getTimeLeft(endsAt)}</p>
                </div>
              </Link>
              <FavoriteButton id={id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex text-lg px-6 md:px-10 mt-14 justify-center">
          No listings found for
          <div className="lowercase ml-2">'{selectedFilter}' tag.</div>
        </div>
      )}
    </>
  );
}
