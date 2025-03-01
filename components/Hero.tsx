
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { WaitlistForm } from "./forms/WaitlistForm";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-tr from-green-300 via-green-50 to-white w-full py-6">
      <div className="relative w-full py-2">
        <div className="w-[90%] mx-auto flex flex-col justify-center items-center ">
          <div className="flex flex-col items-center justify-center text-center gap-6 md:text-lg lg:text-xl">
            <h1 className="w-[80%] md:w-[70%] lg:w-[55%] xl:w-[40%] text-[30px] md:text-[40px] lg:text-[60px] xl:text-[80xl] font-bricolage tracking-tight leading-snug py-3 font-black bg-gradient-to-br from-green-700 to-orange-500 bg-clip-text text-transparent">
              Build Better Habits, One Day at a Time!
            </h1>
            <p className="w-[90%] md:w-[70%] lg:w-[50%] leading-[35px] md:leading-[42px] font-medium">
              Track your progress, stay consistent, and celebrate your victories
              with LockedIn, the ultimate habit and daily routine tracker designed
              to help you stay focused and achieve your goals.
            </p>

            <Dialog>
              <DialogTrigger className="rounded-full px-10 py-4 text-lg duration-500 transition bg-transparent border border-green-600 text-green-600 hover:text-white hover:bg-green-600 hover:font-bold hover:border-none leading-none">
                <span>Join Wait List</span>
              </DialogTrigger>
              <DialogContent className="md:p-8 w-fit">
                <DialogHeader className="flex flex-col gap-6">
                  <DialogTitle className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                    Experience LockedIn First-hand
                  </DialogTitle>
                  <DialogDescription className="text-md text-gray-700 md:text-justify">
                    Be among the first set of people to test and use LockedIn app.
                    Stay informed about its development milestones and launch date
                    announcements.
                  </DialogDescription>
                </DialogHeader>
                <WaitlistForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
