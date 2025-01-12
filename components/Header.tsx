import Link from 'next/link';
import React from 'react'

export const Header = () => {
  return (
    <header className="py-3 px-6 bg-black text-white flex justify-between items-center">
        <Link href="/" className="font-extrabold text-2xl text-green-600 font-nunito">
          Locked
          <span className="bg-orange-500 rounded-[7px] px-1 text-white">
            In
          </span>
        </Link>

        <Link
          href="/auth/sign-in" // "/onboarding/waitlist"
          className="font-nunito light_btn"
        >
          Get Started
        </Link>
    </header>
  );
}
