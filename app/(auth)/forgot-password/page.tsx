import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Habit & Routine Tracker",
  description: "Habit & Routine Tracker",
};

const ForgotPassword = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center transition-all duration-300 relative">
      Forgot Password
    </div>
  );
};

export default ForgotPassword;
