import { Listing } from "@/types/ListingTypes";
import SingleListing from "../components/SingleListing";
import { cookies } from "next/headers";
import MoreFromSameId from "../components/MoreFromSameId";

export default async function SingleListingPage({
  params,
}: {
  params: { id: string };
}) {
  const isLoggedIn: any = cookies().get("accessToken");
  const userName: any = cookies().get("userName")?.value;

  const { id } = params;
  const url = process.env.API_ALL_LISTINGS + `/${id}?_bids=true&_seller=true`;

  const listingById = await fetch(url);
  const { data } = (await listingById.json()) as { data: Listing };

  return (
    <div className="px-4 md:px-10 pt-16 pb-80">
      <SingleListing data={data} isLoggedIn={isLoggedIn} userName={userName} />
      <MoreFromSameId />
    </div>
  );
}
