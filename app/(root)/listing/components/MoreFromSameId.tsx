import { Button } from "@/components/Button";
import { getTimeLeft } from "@/lib/time-converter";
import { Heart } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import NoToken from "./NoToken";
import FavoriteButton from "@/components/FavoriteButton";

interface ListingsWithSeller {
  id: string;
  listings: {
    id: string;
    title: string;
    description: string;
    media: {
      url: string;
      alt: string;
    }[];
    created: string;
    endsAt: string;
  }[];
}

export default async function MoreFromSameId({
  seller,
  id,
}: {
  seller: string;
  id: string;
}) {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return <NoToken seller={seller} />;
  }

  const url = process.env.API_PROFILES + `/${seller}?_listings=true&_bids=true`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": process.env.API_KEY || "",
      "Content-Type": "application/json",
    },
  });
  const { data } = (await res.json()) as { data: ListingsWithSeller };

  const { listings } = data;

  // show only active listings with images and exclude the current listing by id
  const filteredListings = listings.filter(
    (listing) =>
      listing.media &&
      listing.media.length > 0 &&
      new Date(listing.endsAt) > new Date() &&
      listing.id !== id
  );

  return (
    <>
      <div className="flex items-center border-t mt-20 pt-10 md:pt-20 pb-6 md:pb-10 text-xl font-medium">
        More from
        <Link href={`/profile/${seller}/listings`}>
          <Button
            variant="link"
            className="px-0 ml-1.5 text-xl font-medium capitalize"
          >
            {seller}
          </Button>
        </Link>
      </div>
      {filteredListings.length > 0 ? (
        <div className="flex gap-6 md:gap-10 overflow-scroll no-scrollbar">
          {filteredListings.map(({ id, title, media, endsAt }) => (
            <Link key={id} href={`/listing/${id}`} className="relative">
              <div className="h-32 md:h-52 w-52 md:w-80">
                <img
                  src={media[0].url}
                  alt={media[0].alt}
                  className="h-full w-full object-cover bg-slate-100 rounded-lg"
                />
              </div>
              <div className="py-2 w-52 md:w-80">
                <h2 className="md:text-lg font-semibold overflow-hidden truncate first-letter:capitalize">
                  {title}
                </h2>
                <FavoriteButton id={id} />
                <p className="text-xs md:text-sm">{getTimeLeft(endsAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-gray-700">
          This seller has no other active listings.
        </div>
      )}
    </>
  );
}
