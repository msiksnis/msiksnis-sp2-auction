import Listings from "@/components/Listings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyListingsPage({
  params,
}: {
  params: { userName: string };
}) {
  const isLogged = cookies().get("accessToken") ? true : false;
  const accessToken = cookies().get("accessToken")?.value;

  if (!isLogged) {
    redirect("/login");
  }

  const url = process.env.API_PROFILES + `/${params!.userName}/listings?`;
  const usersListing = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": process.env.API_KEY || "",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  // console.log(usersListing);

  return (
    <>
      <Listings data={usersListing.data} />
    </>
  );
}
