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

    return (
        <div className="border w-full h-full border-gray-700 bg-slate-100 p-2 hover:bg-purple-100 rounded-md">
            <div className={`h-1 ${accessibilityColors[accessibility]} rounded-t-full`}></div>
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
    );
}
