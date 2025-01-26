"use client";
import { useAuthStore } from '@/providers/auth-store-provider';
import Link from 'next/link';
import React from 'react'

export const Header = () => {
  const { user, isAuthenticated, clearData } = useAuthStore((state) => state);

  console.log("\n\n\n\n\n", user, isAuthenticated,"\n\n\n")
  return (
    <header className="py-3 px-6 bg-orange-500 bg-opacity-20 flex justify-between items-center">
        <Link href="/" className="font-extrabold text-2xl text-green-600 font-nunito">
          Locked
          <span className="bg-orange-500 rounded-[7px] px-1 text-white">
            In
          </span>
        </Link>

        <span className='flex gap-2 items-center'>
          <Link href="/explore" className='font-nunito'>
            Explore 
          </Link>
          {
            isAuthenticated ? (
              <button 
                onClick={clearData}
                className="font-nunito light_btn">
                Sign Out
              </button>
            ) : 
            (
              <Link
                href="/auth/sign-in" // "/onboarding/waitlist"
                className="font-nunito accent_btn"
              >
                Get Started
              </Link>
            )
          }
          
        </span>
    </header>
  );
}
