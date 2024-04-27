import { ListingsProps } from "../types/ListingTypes";

export default function Listings({ data }: ListingsProps) {
  const listingsWithImages = data.filter((listing) => listing.media.length > 0);

  return (
    <>
      <div className="px-6 md:px-10 mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listingsWithImages.map(({ id, title, _count, media, seller }) => (
          <div key={id} className="h-96 bg-slate-100 rounded-lg">
            {media.length > 0 && (
              <img
                src={media[0].url}
                alt={media[0].alt}
                className="h-52 w-full object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-lg mt-2">{_count.bids}</p>
              <p className="text-lg mt-2">{seller.name}</p>
              <img
                src={seller.avatar.url}
                alt={seller.avatar.alt}
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
