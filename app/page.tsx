import HeroSection from "@/sections/hero-section";
import FeatureSliderSection, { Feature } from "@/sections/feature-slider";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "LockedIn | Habit and Daily Routine Tracker",
    template: "%s | LockedIn",
  },
  description:
    "Stay on top of your goals with LockedIn, the ultimate habit and daily routine tracker. Designed to help you build lasting habits, this intuitive app enables users to set, track, and monitor their daily routines with ease. Whether you're aiming to develop better habits, stay consistent, or improve your productivity, LockedIn is your go-to tool for self-improvement. With a clean and user-friendly interface, it helps you stay focused, motivated, and on track towards achieving your long-term objectives. Download today and unlock your full potential! ",
};


export default function Home() {
  return (
    <>
        <HeroSection 
          primaryText="Build Better Habits!" 
          styledText="Track Habit Forming Tasks"
          secondaryText="and celebrate new habits"
          image="/images/hero-image.jpg"
          flow="reversed"
        />

        <section className="w-full my-10 flex justify-center">
            <Link
              href="/onboarding/waitlist" 
              className="font-nunito accent_btn"
            >
              Join Waitlist
            </Link>
        </section>
        <FeatureSliderSection /> 
    </>
  );
}


