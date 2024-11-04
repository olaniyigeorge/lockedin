import Link from "next/link";
import { iLifeDomain } from "./forms/life-domain-form";
import { iHabitTask } from "./habit-task-card";

interface iHabitTaskEntry {
    _id: string;
    habit: string;
    date: Date;
    completed: boolean;
}

export interface eHabitTask {
    _id: string;
    aspect: string;
    owner: string;
    title: string;
    description: string;
    accessibility: "public" | "private" | "partnership";
    start_date: Date;
    end_date: Date;
    entries: iHabitTaskEntry[];
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

const getDaysInRange = (startDate: Date, endDate: Date) => {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

export default function HabitTaskChartCard(hbtk: eHabitTask) {
    const { accessibility, start_date, end_date, entries } = hbtk;

    // Create a set of completed entry dates for quick lookup
    const completedDates = new Set(entries.map(entry => new Date(entry.date).toDateString()));

    // Generate all dates in the range from start_date to end_date
    const dateRange = getDaysInRange(new Date(start_date), new Date(end_date));

    return (
        <div className="border w-full border-gray-700 bg-slate-100 p-2 hover:bg-purple-100 rounded-md">
            <div className={`h-1 ${accessibilityColors[accessibility]} rounded-t-full`}></div>
            <div className="">
                <h1 className="font-medium flex justify-between items-center hover:text-purple-500 w-fit mt-1">
                    <Link href={`/i/lockedin/habit-tasks/${hbtk._id}`}>
                        {hbtk.title}
                    </Link>
                </h1>
                <span className="text-sm ">{hbtk.description}</span>
                <div className="text-sm text-gray-600 mt-2">
                    <p className="text-xs">Starts: {formatDate(start_date)}</p>
                    <p className="text-xs">Ends: {formatDate(end_date)}</p>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mt-2">
                {dateRange.map(date => (
                    <div key={date.toDateString()} className={`h-8 w-8 flex items-center justify-center rounded ${completedDates.has(date.toDateString()) ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {completedDates.has(date.toDateString()) && (
                            <span className="text-white text-xs">✔️</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
