"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Favorites = ({ onToggleFavorite }) => {
  const favorites = useSelector((state) => state.favorites);
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        favorites.map((movie) => (
          <div
            key={movie.id}
            className="border rounded-lg shadow-lg p-4 mt-2 flex items-start"
          >
            <Image
              src={`${posterBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              width={96}
              height={144}
              className="object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg">{movie.title}</h3>
              <p className="text-gray-600">
                Release Date: {movie.release_date}
              </p>
              <p className="mt-2 line-clamp-3">{movie.overview}</p>
              <button
                className="mt-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                onClick={() => {
                  // console.log(movie);
                  onToggleFavorite(movie);
                }}
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
