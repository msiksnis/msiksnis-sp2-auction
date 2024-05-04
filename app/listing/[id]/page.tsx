import { Listing } from "@/types/ListingTypes";
import SingleListing from "../components/SingleListing";

export default async function SingleListingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const url = process.env.API_ALL_LISTINGS + `/${id}?_bids=true&_seller=true`;

  const listingById = await fetch(url);
  const { data } = (await listingById.json()) as { data: Listing };

  console.log("data", data);

  return (
    <div className="px-4 md:px-10 pt-16 pb-80">
      <SingleListing data={data} />
    </div>
  );
}
