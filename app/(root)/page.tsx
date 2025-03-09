import { Faqs } from "@/components/Faqs";
import { FeatureSection } from "@/components/FeatureSection";
import { HomeHeroSection } from "@/components/HomeHeroSection";
import { WaitlistSection } from "@/components/WaitlistSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LockedIn | Habit & Routine Tracker",
  description: "Habit & Routine Tracker",
};

const Home = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center transition-all duration-300 relative">
      <HomeHeroSection />
      <FeatureSection />
      <Faqs />
      <WaitlistSection />
    </div>
  );
};

export default Home;
