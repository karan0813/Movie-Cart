"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import useDebounce from "@/components/Hook/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "@/store/actions";
import SearchBar from "@/components/SearchBar";
import MovieList from "@/components/MovieList";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const language = process.env.NEXT_PUBLIC_LANGUAGE;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const fetchMovies = async () => {
    try {
      const url =
        query.length > 2
          ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=${language}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
      //   console.log("response.data.results" ,response.data.results)
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [debouncedQuery]);

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    //   console.log("updatedFavorites" ,updatedFavorites)
    dispatch(addFavorite(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center">Movie Search App</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <MovieList
        movies={movies}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    </div>
  );
}
