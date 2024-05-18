// utils/localStorage.ts
const FAVORITES_KEY = "userFavorites";

export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const setFavorites = (favorites: string[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (favoriteId: string): void => {
  if (typeof window === "undefined") return;
  const favorites = getFavorites();
  if (!favorites.includes(favoriteId)) {
    favorites.push(favoriteId);
    setFavorites(favorites);
  }
};

export const removeFavorite = (favoriteId: string): void => {
  if (typeof window === "undefined") return;
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((id) => id !== favoriteId);
  setFavorites(updatedFavorites);
};
