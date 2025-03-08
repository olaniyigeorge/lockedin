import React from "react";

export const FeatureSection = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col md3:flex-row justify-center md3:justify-between items-center">
      <div className="w-full md3:w-[40%] flex flex-col gap-6 py-6 md3:py-12">
        <h2 className="text-[min(10vw,28px)] font-bold text-lockedin-green text-center md3:text-left">
          Effective habits & productive routines
        </h2>
        <p className="text-[min(5vw,17px)] leading-[min(8vw,42px)] text-center md3:text-left">
          Trust LockedIn to fuel your growth, keep you disciplined, and push you
          toward unstoppable consistency—whether you&apos;re building new
          habits, mastering old ones, or just crushing your daily routine. With
          powerful tools designed to energize your passion, spark motivation,
          and keep you locked in, there&apos;s nothing standing between you and
          your goals!
        </p>
      </div>

      <div className="w-full md3:w-[50%] columns-1 md:columns-2 gap-6 space-y-6">
        <div className="bg-white shadow-md p-6 rounded-lg break-inside-avoid w-full ">
          <h3 className="font-bold text-[min(10vw,21px)] mb-4 text-lockedin-orange">
            Habit Tracking
          </h3>
          <p className="text-lockedin-green leading-[min(8vw,28px)]">
            Build consistent streaks by logging your habits regularly. Stay on
            track and turn daily actions into lasting habits.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg break-inside-avoid w-full ">
          <h3 className="font-bold text-[min(10vw,21px)] mb-4 text-lockedin-orange">
            Accountability Partners
          </h3>
          <p className="text-lockedin-green leading-[min(8vw,28px)]">
            Stay committed to your goals by partnering with real people or AI
            for ongoing accountability, motivation, and personalized support to
            keep you on track.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg break-inside-avoid w-full ">
          <h3 className="font-bold text-[min(10vw,21px)] mb-4 text-lockedin-orange">
            Goal Staking
          </h3>
          <p className="text-lockedin-green leading-[min(8vw,28px)]">
            Use blockchain technology to pledge funds as a commitment to your
            goals. Stay accountable, stay motivated, and earn rewards for
            consistency.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg break-inside-avoid w-full ">
          <h3 className="font-bold text-[min(10vw,21px)] mb-4 text-lockedin-orange">
            AI Verification & Monitoring
          </h3>
          <p className="text-lockedin-green leading-[min(8vw,28px)]">
            Automatically verify your habit submissions with AI technology,
            ensuring accuracy and consistency.
          </p>
        </div>
      </div>
    </div>
  );
};
