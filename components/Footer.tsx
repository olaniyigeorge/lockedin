import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <nav className="relative w-full ">
      <div className="w-[90%] mx-auto flex flex-col gap-2 items-center py-6">
        <Link href="/">
          <h1 className="font-bold text-xl text-lockedin-green">
            Locked
            <span className="bg-lockedin-orange rounded-[4px] px-1 text-white">
              In
            </span>
          </h1>
        </Link>

        <p className="text-[15px]">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold">LockedIn</span>
        </p>
      </div>
    </nav>
  );
};
