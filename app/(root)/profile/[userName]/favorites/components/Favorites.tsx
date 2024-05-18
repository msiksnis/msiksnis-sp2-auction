"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Listing } from "@/types/ListingTypes";
import { getFavorites, removeFavorite } from "@/lib/local-storage";
import Loading from "@/app/loading";
import { getTimeLeft } from "@/lib/time-converter";
import FavoriteButton from "@/components/FavoriteButton";

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteListings, setFavoriteListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const favoriteListingIds = getFavorites();
    setFavorites(favoriteListingIds);

    const fetchFavoriteListings = async () => {
      try {
        const listings = await Promise.all(
          favoriteListingIds.map(async (listingId) => {
            const res = await axios.get(`/api/listings/${listingId}`);
            return res.data.data;
          })
        );
        setFavoriteListings(listings);
      } catch (error) {
        console.error("Error fetching favorite listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (favoriteListingIds.length > 0) {
      fetchFavoriteListings();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleRemoveFavorite = (id: string) => {
    setFavoriteListings((prevFavorites) =>
      prevFavorites.filter((listing) => listing.id !== id)
    );
    removeFavorite(id);
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : favoriteListings.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteListings.map(({ id, title, media, _count, endsAt }) => (
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
                <p className="text-sm">{getTimeLeft(endsAt)}</p>
              </div>
              <FavoriteButton id={id} onRemoveFavorite={handleRemoveFavorite} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="md:text-lg text-center mt-10">
          You don't have any favorite items yet.
        </div>
      )}
    </div>
  );
}
