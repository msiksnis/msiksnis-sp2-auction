import { Metadata } from "next";

import Favorites from "./components/Favorites";

export async function generateMetadata({
  params,
}: {
  params: { userName: string };
}): Promise<Metadata> {
  const userName = params.userName;

  return {
    title: `Auction House | ${userName}'s Favorites`,
  };
}

export default function FavoritesPage() {
  return (
    <div className="mt-10 md:mt-14 px-6 md:px-10">
      <div className="text-2xl md:text-3xl font-medium">My Favorites</div>
      <Favorites />
    </div>
  );
}
