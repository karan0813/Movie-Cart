export const addFavorite = (movie) => ({
  type: "ADD_FAVORITE",
  payload: movie,
});

export const removeFavorite = (movie) => ({
  type: "REMOVE_FAVORITE",
  payload: movie,
});
