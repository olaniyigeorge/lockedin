import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <nav className="p-4 bg-orange-500 bg-opacity-20 flex flex-col gap-3 items-center">
      <h1 className="text-2xl text-green-600 font-bold">
        Locked
        <span className="text-white bg-orange-500 p-1 rounded-md">
          In
        </span>
      </h1>
      
      <div className="text-center">
        <p className="">
          © {new Date().getFullYear()} <Link className="underline hover:text-orange-500" href="/">LockedIn</Link>. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <a href="/privacy" className="underline hover:text-orange-600">Privacy Policy</a>
          <a href="/terms" className="underline hover:text-orange-600">Terms of Service</a>
          <a href="/contact" className="underline hover:text-orange-600">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}
