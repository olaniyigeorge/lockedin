import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <nav className="w-full p-4 text-white orange_gradient_bg bg-opacity-20 flex flex-col gap-2 items-center">
      <h1 className="text-2xl text-green-600 font-extrabold">
        Locked
        <span className="bg-white text-orange-500 px-1 rounded-md">
          In
        </span>
      </h1>
      
      <div className="text-center">
        <p className="">
          © {new Date().getFullYear()} <Link className="underline" href="/">LockedIn</Link>. All Rights Reserved.
        </p>
      </div>
    </nav>
  );
}
