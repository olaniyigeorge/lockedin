  import { ArrowRightIcon } from "lucide-react";
  import Link from "next/link";
  import React from "react";
  import Image from "next/image";
  export function CTA() {
    return (
      <div className="w-full py-16  bg-gradient-to-b from-white to-green-300 bg-transparent text-white text-center px-2">
        <section id="cta-2" className="main flex flex-col justify-center items-center relative">
          <h2 className="text-3xl md:text-5xl black_green_gradient font-black">Sign Up for Free Today</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-green-800">Turn your goals into reality with LockedIn. Track your progress, stay accountable, and celebrate every achievement along the way.</p>
          
          <div className="flex justify-center items-center gap-8 my-10">
            <Link
              href="/auth/sign-in"
              className="font-poppins bg-black  px-4 py-2 rounded-xl "
            >
              Sign Up Now
            </Link>

            <Link
              href="/onboarding/waitlist" // /auth/sign-in
              className="flex items-center text-black"
            >
              <>Early Access</>
              <ArrowRightIcon className="w-8 h-4" />
            </Link>
          </div>
          <Image 
            src="/imgs/streak.png"
            alt="streak" 
            width={200} 
            height={200} 
            className="top-8 left-4 md:top-0 md:left-24 w-10 md:w-[200px] absolute z-100 object-file rotate-6"
          />
          <Image 
            src="/imgs/streak.png"
            alt="streak" 
            width={200} 
            height={200} 
            className="top-8 right-4 md:top-0 md:right-16 w-10 md:w-[200px]  absolute z-100 object-file rotate-6"
          />
        </section>  </div>
    );
  }
