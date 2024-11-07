import Link from 'next/link';
import React from 'react'

export const Header = () => {
  return (
    <header className="relative w-full">
      <div className="w-[90%] mx-auto flex justify-between items-center py-6">
        <h1 className="font-extrabold text-4xl font-nunito text-green-600 ">
          Locked
          <span className="bg-orange-500 rounded-[7px] px-1 text-white">
            In
          </span>
        </h1>

        <Link
          href=""
          className="hover:bg-green-600 hover:text-white hover:font-bold rounded-full px-6 py-4 transition-all duration-500 leading-none"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
