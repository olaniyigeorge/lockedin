import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="relative w-full pt-28">
      <div className="w-[90%] mx-auto flex flex-col justify-center items-center ">
        <div className="flex flex-col items-center justify-center text-center gap-8 md:text-lg lg:text-xl">
          <h1 className="w-[80%] md:w-[70%] lg:w-[55%] xl:w-[40%] text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-nunito font-extrabold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
            Build Better Habits, One Day at a Time!
          </h1>
          <p className="w-[90%] md:w-[70%] lg:w-[50%] leading-[35px] md:leading-[42px] xl:leading-[50px]">
            Track your progress, stay consistent, and celebrate your victories
            with LockedIn, the ultimate habit and daily routine tracker designed
            to help you stay focused and achieve your goals.
          </p>

          <Button className="rounded-full px-10 py-8 text-lg duration-500 transition bg-transparent border border-green-600 text-green-600 hover:text-white hover:bg-green-700 hover:font-bold hover:border-none">
            Join Wait List
          </Button>
        </div>
      </div>
    </div>
  );
};