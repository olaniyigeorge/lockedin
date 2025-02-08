import TrackerCalenderView from "@/components/tracker-calender";

export default async function HabitTaskDetailsPage({params,}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/habit-tasks?id=${id}`, {
            method: "GET",
        });
        const habitTask = await response.json();

        if (response.ok) {
              return (
                <div className="w-full flex items-center justify-center p-4 my-4  ">
                    <TrackerCalenderView {...habitTask}/>
                </div>
            );
        } else {
            throw Error("Error getting this habit tasks!!!")
        }
    } catch (error) {
        console.error(error);
        return (
            <span className="">
                <h1 className="text-red-500 font-bold text-xl md:text-3xl">Error</h1>
                <div className="">
                    Error getting this habit tasks!!!
                </div>
            </span>
        );
    }
}






















