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
            image="/hero-image.jpg"
            flow="reversed"
        />
        
        
            <Link 
                 className="text-green-600 white_outline_btn my-5 md:my-10 font-nunito text-xl"
                href=""
            > 
                Join the conversation on how to build better habits
            </Link> 
            

        
        <FeatureSlider features={sampleFeatures} className=""/>

        
    
</section>
  );
}



// Sample features for the app
const sampleFeatures: Feature[] = [
  {
      title: "Feature One",
      description: "This is the description for feature one.",
      icon: "icon-one"
  },
  {
      title: "Feature Two",
      description: "This is the description for feature two.",
      icon: "icon-two"
  },
  {
      title: "Feature Three",
      description: "This is the description for feature three.",
      icon: "icon-three"
  }
];



// export default function Home() {
//   return (
//     <div className="relative">
//       <Hero />
//     </div>
//   );
// }
