"use client";

import React from "react";

const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative w-full h-72">
        <img
          src={posterUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 h-64">
        <h3 className="text-lg font-semibold cursor-pointer">{movie.title}</h3>
        <p className="text-gray-600">{movie.release_date}</p>
        <p className="mt-2 line-clamp-3">{movie.overview}</p>
        <p className="mt-2 font-bold">Rating: {movie.vote_average}</p>
        <button
          className={`mt-3 p-2 rounded-lg ${
            isFavorite ? "bg-red-500" : "bg-blue-500"
          } text-white hover:bg-opacity-80`}
          onClick={() => onToggleFavorite(movie)}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
