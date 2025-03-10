import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Habit & Routine Tracker",
  description: "Habit & Routine Tracker",
};

const ResetPassword = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center transition-all duration-300 relative">
      Reset Password
    </div>
  );
};

export default ResetPassword;
