"use client";

import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="w-full z-30 ">
      <div className="w-[90%] mx-auto flex justify-between items-center py-6">
        <Link href="/">
          <h1 className="font-extrabold text-2xl text-lockedin-green ">
            Locked
            <span className="bg-lockedin-orange rounded-[4px] px-1 text-white">
              In
            </span>
          </h1>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/signup"
            className="bg-lockedin-green hover:bg-lockedin-orange text-white rounded-full px-6 py-3 transition-all duration-300 leading-none hover:font-bold"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="hover:bg-lockedin-orange text-lockedin-green hover:text-white rounded-full px-6 py-3 transition-all duration-300 leading-none hover:font-bold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};
