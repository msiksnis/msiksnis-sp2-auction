import Favorites from "./components/Favorites";

export default function FavoritesPage() {
  return (
    <div className="mt-10 md:mt-14 px-6 md:px-10">
      <div className="text-2xl md:text-3xl font-medium">My Favorites</div>
      <Favorites />
    </div>
  );
}
