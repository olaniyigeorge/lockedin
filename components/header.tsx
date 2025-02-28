"use client";
import { useAuthStore } from '@/providers/auth-store-provider';
import { ListChecks, ListIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export const Header = () => {
  const { isAuthenticated, clearData } = useAuthStore((state) => state);
  return (
    <div className="w-full bg-white py-3 px-6  font-bebas sticky top-0 right-0  bg-opacity-20 backdrop-blur-md  z-1000">
      <header className="main flex justify-between items-center">
          <Link href="/" className="font-black  text-2xl text-green-500 ">
            Locked
            <span className="text-white rounded-[7px] px-1 bg-orange-500">
              In
            </span>
          </Link>

          <span className='flex gap-2 items-center'>
            <Link href="/explore" className='flex items-center gap-1 p-2 border hover:scale-x-105 duration-400 animate_style glassmorphism'>
              <ListIcon className='w-5 h-5' /><>Explore</>
            </Link>
            {
              isAuthenticated ? (
                  <button 
                  onClick={() => {
                    clearData();
                    window.location.href = "/";
                  }}
                  className="light_btn font-medium transition-all  ease-in-out">
                  Sign Out
                  </button>
              ) : 
              (
                <Link
                  href="/onboarding/waitlist" // ""
                  className="accent_btn font-medium transition-all duration-300 ease-in-out"
                >
                  Join Us
                </Link>
              )
            }
            
          </span>
      </header>
    </div>
  );
}
