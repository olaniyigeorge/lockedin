import { Metadata } from "next";
import { SignupForm } from "../components/SignupForm";

export const metadata: Metadata = {
  title: "Signup | Habit & Routine Tracker",
  description: "Habit & Routine Tracker",
};

const Signup = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center transition-all duration-300 relative py-10">
      <SignupForm />
    </div>
  );
};

export default Signup;
