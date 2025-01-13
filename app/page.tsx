import { Hero } from "@/components/Hero";
import HeroSection from "@/components/hero-section";
import FeatureSlider, { Feature } from "@/components/ui/feature-slider";
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
    <section className="w-full flex-col flex items-center gap-8 py-10">
        <HeroSection 
          primaryText="Build Better Habits!" 
          styledText="Track Habit Forming Tasks"
          secondaryText="and celebrate new habits"
          image="/images/hero-image.jpg"
          flow="reversed"
        />
                
        <Link 
          className="text-green-600 white_outline_btn my-5 md:my-10 font-nunito text-xl"
          href=""
        > 
          Join the conversation on how to build better habits
        </Link> 
      
        <FeatureSlider 
          features={features} 
          className=""
        />

        
    
</section>
  );
}

// Features for the app
const features: Feature[] = [
  {
    added_at: new Date('2023-01-01T10:00:00Z'),
    title: "Join Waitlist",
    description: "Waitlist form hooked to db.",
    icon: "icon-one",
    status: "staging"
  },
  {
    added_at: new Date('2023-02-15T14:30:00Z'),
    title: "Authentication",
    description: "Sign up and sign in",
    icon: "icon-two",
    status: "dev"
  },
  {
    added_at: new Date('2023-02-15T14:30:00Z'),
    title: "Accountability Partnership(Challenge)",
    description: "Allow users setup tasks, stake a wager to be redeemed little by little for every entry made on th task and invite friends to hold you accountable and join the challenge.",
    icon: "icon-two",
    status: "dev"
  },
  {
    added_at: new Date('2023-03-30T08:45:00Z'),
    title: "Habit Tasks Management",
    description: "Create habit tasks with the ability to update its visibility status and extent its end time on the last day",
    icon: "icon-three",
    status: "scheduled"
  },
];
