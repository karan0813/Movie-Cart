"use client";

import { createStore } from "redux";

// Initial state
const initialState = {
  favorites: [],
};

// Action types
const ADD_FAVORITE = "ADD_FAVORITE";
const REMOVE_FAVORITE = "REMOVE_FAVORITE";

// Reducer
const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(favoritesReducer);

export default store;
