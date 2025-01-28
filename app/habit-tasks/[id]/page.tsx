
import MarkTodayButton from "@/components/mark-today-button";
import TrackerCalenderView, { eHabitTask } from "@/components/tracker-calender";

export default async function HabitTaskDetailsPage({params,}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/habit-tasks?id=${id}`, {
            method: "GET",
        });
        const habitTask = await response.json();

        if (response.ok) {
              return (
                <div className="container mx-auto p-4 my-4 bg-white bg-opacity-30 backdrop-blur shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">{habitTask.title}</h1>
                    <p className="text-gray-700 mb-4">{habitTask.description}</p>

                    <div className="flex justify-between items-center mb-4">
                        <span className={`badge p-1 rounded-full ${habitTask.accessibility === "public" ? "bg-green-200" : habitTask.accessibility === "private" ? "bg-red-200" : "bg-blue-200"}`}>
                            {habitTask.accessibility.charAt(0).toUpperCase() + habitTask.accessibility.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(habitTask.start_date).toLocaleDateString()} - {new Date(habitTask.end_date).toLocaleDateString()}
                        </span>
                    </div>

                    <MarkTodayButton habitId={id} />

                    <TrackerCalenderView {...habitTask}/>
                </div>
            );
        } else {
            return (
                <span className="">
                    <>{response.status}</>
                    <div className="">
                        This Habit Task {id}
                    </div>
                </span>
            );
        }
    } catch (error) {
        console.log(error);
        return (
            <span className="">
                <>Error</>
                <div className="">
                    This Habit Task {id}
                </div>
            </span>
        );
    }
}






















