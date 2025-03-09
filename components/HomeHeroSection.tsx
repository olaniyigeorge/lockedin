"use client";

import React from "react";
import { Button } from "./ui/button";
import { useGlobalState } from "@/globalStore";

export const HomeHeroSection = () => {
  const { setIsWaitlistModalOpen } = useGlobalState();

  return (
    <div className="w-[90%] mx-auto flex flex-col justify-center items-center pt-16 md:pt-0 pb-28">
      <div className="flex flex-col items-center justify-center text-center gap-8 pt-12 relative">
        <h1 className="w-[90%] sm3:w-[80%] md2:w-[70%] lg:w-[60%] text-[min(10vw,60px)] font-extrabold bg-gradient-to-r from-lockedin-green to-lockedin-orange bg-clip-text text-transparent">
          Build Better Habits, One Day at a Time!
        </h1>
        <p className="w-[90%] text-[min(5vw,18px)] md:w-[70%] lg:w-[50%] leading-[min(8vw,42px)]">
          Track your progress, stay consistent, and celebrate your victories
          with LockedIn, the ultimate habit and daily routine tracker designed
          to help you stay focused and achieve your goals.
        </p>

        <Button
          onClick={() => setIsWaitlistModalOpen(true)}
          className="rounded-full px-10 py-6 duration-300 transition-all bg-transparent border border-lockedin-green text-lockedin-green hover:text-white hover:bg-lockedin-green hover:font-bold hover:border-none leading-none cursor-pointer"
        >
          Join Wait List
        </Button>
      </div>
    </div>
  );
};
