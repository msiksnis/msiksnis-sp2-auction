"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { getTimeLeft } from "@/lib/time-converter";
import { Listing } from "@/types/ListingTypes";
import { Button } from "@/components/Button";

const filteringOptions = [
  { value: "all", label: "All" },
  { value: "ending_soon", label: "Ending soon" },
  { value: "active", label: "Active" },
];

interface FilteredDataProps {
  data: Listing[];
}

export default function FilteredListings({ data }: FilteredDataProps) {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedLabel, setSelectedLabel] = useState("All");

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterParam = searchParams.get("filter");

  console.log("filterParam", filterParam);

  const handleFilterChange = (filter: string, label: string): void => {
    setSelectedLabel(label);
    router.push(`/profile/${params.userName}/listings?filter=${filter}`);
  };

  useEffect(() => {
    switch (filterParam) {
      case "all":
        setFilteredData(data);
        break;
      case "active":
        setFilteredData(
          data.filter((item) => new Date(item.endsAt) > new Date())
        );
        break;
      case "ending_soon":
        setFilteredData(
          data.filter(
            (item) =>
              new Date(item.endsAt).getTime() > new Date().getTime() &&
              new Date(item.endsAt).getTime() - new Date().getTime() <=
                24 * 60 * 60 * 1000 // 24 hours
          )
        );
        break;
      default:
        setFilteredData(data);
    }
  }, [filterParam, data]);

  return (
    <div>
      <div className="flex items-center overflow-x-scroll no-scrollbar space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 mt-10">
        {filteringOptions.map((option) => (
          <Button
            variant="secondary"
            rounded="full"
            key={option.value}
            value={option.value}
            onClick={() => {
              handleFilterChange(option.value, option.label);
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {!filteredData.length || !data.length ? (
        <div className="mt-10">No '{selectedLabel}' listings.</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
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
                <p className="text-sm">{getTimeLeft(endsAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
