import React from "react";

const MovieDetails = ({ movie }) => {
  return (
    <div className="p-5 border rounded-lg shadow-lg mt-5">
      <h2 className="text-2xl font-bold">{movie.Title}</h2>
      <p className="mt-2">Release Date: {movie.Released}</p>
      <p>Rating: {movie.imdbRating}</p>
    </div>
  );
};

export default MovieDetails;
