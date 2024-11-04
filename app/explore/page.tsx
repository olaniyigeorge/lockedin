import { iHabitTask } from "@/components/habit-task-card";
import HabitTaskChartCard from "@/components/habit-task-chart-card";
import { auth, signIn } from "@/utils/auth";

export default async function ExplorePage() {
    const session = await auth()
    if (!session?.user) {
        return (
        <div className="p-10 w-full justify-center flex rounded-xl font-extrabold text-3xl">
            <form action={async () => {
                "use server"
                await signIn("google")
                }}
                className=""
            >
                <button className="rounded-full p-2 text-white border" 
                type="submit">Sign In </button>
            </form>
        </div>)
    }

    let habitTasks: iHabitTask[] = []
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/explore?accessibility=public}`, {
            method: "GET",
        });
        habitTasks = await response.json();
    } catch(error){
        console.log(error)
        habitTasks = []
    }


    return ( <div className="w-full justify-start overflow-auto">
        <h1 className=" font-extrabold text-3xl"> Explore</h1>
        <section className="w-full my-4 gap-2 grid grid-cols-1">
               {habitTasks.map((lfd: any) => (
                <div key={lfd._id} className="w-full flex flex-col  ">
                   <HabitTaskChartCard {...lfd}/>
                </div>
               ))}
        </section>
    </div>)
}