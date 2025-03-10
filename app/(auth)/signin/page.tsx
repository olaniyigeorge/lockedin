import { Metadata } from "next";
import Link from "next/link";
import { SigninForm } from "../components/SigninForm";

export const metadata: Metadata = {
  title: "Signin | Habit & Routine Tracker",
  description: "Habit & Routine Tracker",
};

const Signin = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center transition-all duration-300 relative min-h-screen gap-8">
      <Link href="/">
        <h1 className="font-bold text-2xl text-lockedin-green">
          Locked
          <span className="bg-lockedin-orange rounded-[4px] px-1 text-white">
            In
          </span>
        </h1>
      </Link>
      <SigninForm />
    </div>
  );
};

export default Signin;
