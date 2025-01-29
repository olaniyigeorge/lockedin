
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
                <div className="flex p-4 my-4 ">
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






















