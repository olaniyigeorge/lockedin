import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  return (
    <nav className="p-4 bg-black text-white flex flex-col gap-3 items-center border border-gray-900">
      <h1 className="text-2xl text-green-600 font-bold">
        Locked
        <span className="text-yellow-500">
          In
        </span>
      </h1>
      
      <div className="text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} <Link className="underline hover:text-yellow-500" href="/">LockedIn</Link>. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <a href="/privacy" className="underline hover:text-yellow-500">Privacy Policy</a>
          <a href="/terms" className="underline hover:text-yellow-500">Terms of Service</a>
          <a href="/contact" className="underline hover:text-yellow-500">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}
