"use client";

import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { useSelector } from "react-redux";
import Image from "next/image";

const Profile = () => {
  const [user, setUser] = useState(null);
  const favorites = useSelector((state) => state.favorites);
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  // Function to initialize IndexedDB
  const initDB = async () => {
    return openDB("UserDatabase", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "email" });
        }
      },
    });
  };
  // Function to check if user exists
  const checkUserExists = async (email) => {
    const db = await initDB();
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    return store.get(email);
  };

  // Function to fetch user data from IndexedDB
  const fetchUserData = async () => {
    const user = await checkUserExists(localStorage.getItem("email"));
    if (user) {
      setUser(user);
      console.log(user);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
          <Image
            src={user.profilePicture || "https://via.placeholder.com/150"}
            width={24}
            height={24}
            className="w-24 h-24 rounded-full border-2 border-blue-500"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold  text-gray-700">
              {user.Firstname} {user.Lastname}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-700">
          Favorite Movies
        </h2>
        <ul className="list-disc pl-5 mt-2">
          {favorites && favorites.length > 0 ? (
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
                  <h3 className="text-lg text-black">{movie.title}</h3>
                  <p className="text-gray-900">
                    Release Date: {movie.release_date}
                  </p>
                  <p className="mt-2 line-clamp-3 text-black">
                    {movie.overview}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <li className="text-gray-800">No favorite movies listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
