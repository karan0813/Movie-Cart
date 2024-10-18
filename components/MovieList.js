"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { addFavorite, removeFavorite } from "@/store/actions";

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleToggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFavorite(movie));
      // console.log(movie);
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.some((fav) => fav.id === movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
