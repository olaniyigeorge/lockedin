import Link from "next/link";
import MarkTodayButton from "./mark-today-button";

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

export interface iHabitTaskEntry {
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

const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

export default function TrackerCalenderView(hbtk: eHabitTask) {
    const { accessibility, start_date, end_date, entries } = hbtk;

    // Create a set of completed entry dates for quick lookup
    const completedDates = new Set(entries.map(entry => new Date(entry.date).toDateString()));

    // Generate all dates in the range from start_date to end_date
    const dateRange = getDaysInRange(new Date(start_date), new Date(end_date));

    return (
        <div className="border w-full border-gray-400 bg-transparent p-2 rounded-md">
            <div className={`h-[2px] ${accessibilityColors[accessibility]} rounded-full`}></div>
            <div className="">
                <section className="flex justify-between items-center my-1">
                    <h1 className="font-bold flex justify-between items-center w-fit mt-1">
                        <Link 
                            href={`/i/lockedin/habit-tasks/${hbtk._id}`}
                            className="">
                            {hbtk.title}
                        </Link>
                    </h1>
                    <span className={`p-1 h-fit w-fit text-xs flex justify-center rounded-full ${hbtk.accessibility === "public" ? "bg-green-200" : hbtk.accessibility === "private" ? "bg-red-200" : "bg-blue-200"}`}>
                        {hbtk.accessibility.toLocaleLowerCase()}
                    </span>
                </section>
                
                <span className="">{hbtk.description}</span>
            </div>

            <MarkTodayButton habitId={hbtk._id} />

            <div className="flex flex-wrap gap-1 mt-2">
                {dateRange.map(date => (
                    <div
                        key={date.toDateString()}
                        className={`h-4 w-4 flex items-center justify-center rounded ${completedDates.has(date.toDateString()) ? 'bg-green-500' : 'bg-gray-200'} ${isToday(date) ? 'border-2 border-orange-500' : ''}`}
                    >
                        {completedDates.has(date.toDateString()) && (
                            <span className="text-white text-xs">✔️</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="text-sm text-gray-600 mt-2">
                <p className="text-xs">Duration: {formatDate(start_date)} -- {formatDate(end_date)}</p>
            </div>
        </div>
    );
}
