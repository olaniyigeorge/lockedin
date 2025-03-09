"use client";

import React from "react";
import { Button } from "./ui/button";
import { useGlobalState } from "@/globalStore";

export const WaitlistSection = () => {
  const { setIsWaitlistModalOpen } = useGlobalState();

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center py-0 mb-10 md:py-20">
      <div className="w-[90%] md:w-[75%] md3:w-[60%] mx-auto flex flex-col justify-center items-center gap-8">
        <h2 className="text-[min(10vw,28px)] font-bold text-lockedin-orange text-center">
          Unlock Your Best Self with LockedIn! 🚀
        </h2>
        <p className="text-center text-[min(5vw,17px)] leading-[min(8vw,42px)]">
          Ready to build unstoppable habits, stay accountable, and hit every
          goal you set? With LockedIn, you&apos;ll have the tools to track
          progress, stay motivated, and turn consistency into success—all in one
          place! 🔥 Join the waitlist now and be the first to experience a
          game-changing way to stay on track. Your future self will thank you!
          💪✨
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
