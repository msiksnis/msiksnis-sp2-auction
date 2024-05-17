const FAVORITES_KEY = "userFavorites";

export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const setFavorites = (favorites: string[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavorite = (favoriteId: string): void => {
  const favorites = getFavorites();
  if (!favorites.includes(favoriteId)) {
    favorites.push(favoriteId);
    setFavorites(favorites);
  }
};

export const removeFavorite = (favoriteId: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((id) => id !== favoriteId);
  setFavorites(updatedFavorites);
};
