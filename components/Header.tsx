import Link from 'next/link';
import React from 'react'

export const Header = () => {
  return (
    <header className="p-4 bg-black text-white flex justify-between items-center">
        <h1 className="font-extrabold text-4xl text-green-600 font-nunito">
          Locked
          <span className="bg-orange-500 rounded-[7px] px-1 text-white">
            In
          </span>
        </h1>

        <Link
          href="/get-started"
          className="font-nunito light_btn"
        >
          Get Started
        </Link>
    </header>
  );
}
