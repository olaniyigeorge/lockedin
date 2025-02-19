import HeroSection from "@/sections/hero-section";
import { Metadata } from "next";
import Link from "next/link";
import ActionBtns from "@/components/action-btns";
// import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: {
    default: "LockedIn | Habit and Daily Routine Tracker",
    template: "%s | LockedIn",
  },
  description:
    "Stay on top of your goals with LockedIn, the ultimate habit and daily routine tracker. Designed to help you build lasting habits, this intuitive app enables users to set, track, and monitor their daily routines with ease. Whether you're aiming to develop better habits, stay consistent, or improve your productivity, LockedIn is your go-to tool for self-improvement. With a clean and user-friendly interface, it helps you stay focused, motivated, and on track towards achieving your long-term objectives. Sign up today and unlock your full potential! ",
};


export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <HeroSection 
        primaryText="Stay LockedIn!" 
        styledText="Stay Accountable"
        secondaryText="Build Lasting Habits."
        image="/images/hero-image.jpg"
        flow="reversed"
      />

      <ActionBtns />

      <Link
        href="/onboarding/waitlist" // /auth/sign-in
        className="font-nunito page_section accent_btn text-2xl my-10"
      >
        Early Access
      </Link>
               
    </>
  );
}


