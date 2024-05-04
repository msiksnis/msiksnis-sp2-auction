import { Heart } from "lucide-react";
import Link from "next/link";

import { ListingsProps } from "../types/ListingTypes";
import { getTimeLeft } from "@/lib/time-converter";

export default function Listings({ data }: ListingsProps) {
  const listingsWithImages = data.filter((listing) => listing.media.length > 0);

  return (
    <div className="px-6 md:px-10 mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listingsWithImages.map(({ id, title, _count, media, endsAt }) => (
        <Link
          key={id}
          href={`/listing/${id}`}
          className="relative cursor-pointer"
        >
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
  );
}
