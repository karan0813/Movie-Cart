"use client";

import Favorites from "@/components/Favorites";
import { removeFavorite } from "@/store/actions";
import React from "react";
import { useDispatch } from "react-redux";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const handleToggleFavorite = (movie) => {
    dispatch(removeFavorite(movie));
  };

  return (
    <div className="container mx-auto p-5">
      <h1
        className="text-3xl font-bold text-center"
        onClick={() => {
          // console.log(favorites);
        }}
      >
        My Favorites
      </h1>
      <Favorites onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default FavoritesPage;
