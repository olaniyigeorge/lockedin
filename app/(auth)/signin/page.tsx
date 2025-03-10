import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | Habit & Routine Tracker",
  description: "Habit & Routine Tracker",
};

const Signin = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center transition-all duration-300 relative">
      Signin
    </div>
  );
};

export default Signin;
