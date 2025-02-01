import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <nav className="p-4 text-white orange_gradient_bg bg-opacity-20 flex flex-col gap-2 items-center">
      <h1 className="text-2xl text-green-600 font-bold">
        Locked
        <span className="text-white bg-orange-500 px-1 rounded-md">
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
