"use client"
import { useAuthStore } from "@/providers/auth-store-provider";
import Link from "next/link";

export interface iHabitTask {
    _id: string;
    aspect: string;
    owner: string;
    title: string;
    description: string;
    accessibility: "public" | "private" | "partnership";
    start_date: Date;
    end_date: Date;
}

const accessibilityColors: Record<iHabitTask["accessibility"], string> = {
    public: "bg-green-500",
    private: "bg-red-500",
    partnership: "bg-blue-500",
};

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
};

export default function HabitTaskCard(hbtk: iHabitTask) {
    const { accessibility, start_date, end_date } = hbtk;

    const { user } = useAuthStore((state) => state);

    return (
        <div className="border w-full h-full border-gray-400 bg-slate-100 p-2 hover:bg-orange-50 rounded-md">
            <div className={`h-[2px] ${accessibilityColors[accessibility]} rounded-t-full`}></div>
            <h1 className="font-bold text-lg flex justify-between items-center hover:text-green-600 w-fit mt-1">
                {user ? (
                    <Link href={`/habit-tasks/${hbtk._id}`}>
                        {hbtk.title}
                    </Link>
                ) : (
                    <Link href="/onboarding/waitlist">
                        {hbtk.title}
                    </Link>
                )}
            </h1>
            <span className="text- line-clamp-3">{hbtk.description}</span>
            <div className="text-sm text-gray-600 mt-2">
                <p className="text-xs">Duration: {formatDate(start_date)} -- {formatDate(end_date)}</p>
            </div>
        </div>
    );
}
