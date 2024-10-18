"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
  const pathname = usePathname();
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/HomeScreen/profile" passHref>
          <h1 className="text-white text-2xl font-bold cursor-pointer">
            Profile
          </h1>
        </Link>
        <div className="flex space-x-4">
          <Link href="/HomeScreen" passHref>
            <span
              className={`text-white px-3 py-2 rounded-md text-lg relative ${
                pathname === "/HomeScreen"
                  ? "after:content-[''] after:block after:w-full after:h-1 after:bg-blue-600 after:absolute after:-bottom-1 after:left-0"
                  : "hover:animate-bounce"
              }`}
            >
              Home
            </span>
          </Link>
          <Link href="/HomeScreen/favorites" passHref>
            <span
              className={`text-white px-3 py-2 rounded-md text-lg relative ${
                pathname === "/HomeScreen/favorites"
                  ? "after:content-[''] after:block after:w-full after:h-1 after:bg-blue-600 after:absolute after:-bottom-1 after:left-0"
                  : "hover:animate-bounce"
              }`}
            >
              My Favorites
              {favoritesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs">
                  {favoritesCount}
                </span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
