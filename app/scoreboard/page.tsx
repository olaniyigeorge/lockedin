import TrackerCalenderView, { eHabitTask } from "@/components/tracker-calender"


export default async function ScoreboardPage() {

    let habitTasks: eHabitTask[] = []
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/habit-tasks?owner=${1}`, {
            method: "GET",
        });
        habitTasks = await response.json();
    } catch(error){
        console.log(error)
        habitTasks = []
    }


    return ( <div className="w-full flex flex-col items-center justify-start ">
        <h1 className=" font-extrabold text-3xl"> Scoreboard</h1>
        <section className="w-full my-4 gap-2 grid grid-cols-1 ">
               {habitTasks.map((lfd: eHabitTask) => (
                <div key={lfd._id} className="w-full flex flex-col  ">
                   <TrackerCalenderView {...lfd}/>
                </div>
               ))}
        </section>
    </div>)
}