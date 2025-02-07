    import ActionBtns from "@/components/action-btns";
import HabitTaskCard from "@/components/habit-task-card";
    import { iHabitTask } from "@/components/tracker-calender";
import { ListIcon, ProportionsIcon, SwordsIcon } from "lucide-react";
    import Link from "next/link";

    async function getPublicTasks() : Promise<{message: string, 
        data: iHabitTask[]} | null> {
        const response = await fetch(`${process.env.DOMAIN}/api/habit-tasks?accessibility=public`);
        if (!response.ok) {
            console.log('Failed to fetch public tasks');
            return null;
        }
        const data = await response.json();
        return data;
    }

    export default async function ExplorePage() {
        let publicTasks =  null
        publicTasks = await getPublicTasks();
        return (
            <div className="w-full p-2 md:p-4">
                <h1 className="text-3xl font-bold mb-4"></h1>
                <ActionBtns />
                <section className="flex flex-col gap-3 items-center ">
                    <h2 className="text-xl font-extrabold mb-2">Habit Tasks</h2>
                    <h3 className="mb-4 text-xl md:text-2xl">Explore public habit tasks and show support by cheering users on</h3>
                    <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" >
                        {publicTasks ? publicTasks.data.map((task: iHabitTask) => (
                            <li key={task._id} className="mb-2">
                                <HabitTaskCard {...task} />
                            </li>
                        )) : <li>No public tasks available</li>}
                    </ul>
                </section>
            </div>
        );
    }


