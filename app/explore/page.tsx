    import HabitTaskCard from "@/components/habit-task-card";
    import { iHabitTask } from "@/components/tracker-calender";
import { ListIcon, ProportionsIcon, SwordsIcon } from "lucide-react";
    import Link from "next/link";

    async function getPublicTasks() {
        const response = await fetch(`${process.env.DOMAIN}/api/habit-tasks?accessibility=public`);
        if (!response.ok) {
            console.log('Failed to fetch public tasks');
            return [];
        }
        const data = await response.json();
        return data;
    }

    export default async function ExplorePage() {
        const publicTasks = await getPublicTasks();
        return (
            <div className="w-full p-2 md:p-4">
                <h1 className="text-3xl font-bold mb-4"></h1>
                <span className="w-full justify-center flex gap-4 md:gap-6 my-10">
                    <Link href="/habit-tasks" className="flex  border-gray-300 items-center gap-1 p-4 border rounded hover:scale-[103%] duration-400 animate_style glassmorphism font-medium text-gray-900 hover:bg-orange-200">
                        <ListIcon className="w-5 h-5"/> <>Habit Tasks</> 
                    </Link>
                    <Link href="/life-domains" className="flex  border-gray-300 items-center gap-1 p-4 border rounded hover:scale-[103%] duration-400 animate_style glassmorphism font-medium text-gray-900 hover:bg-orange-200">
                    <ProportionsIcon className="w-5 h-5"/> <>Life Domains</> 
                    </Link>
                    <Link href="/challenge" className="flex  border-gray-300 items-center gap-1 p-4 border rounded hover:scale-[103%] duration-400 animate_style glassmorphism font-medium text-gray-900 hover:bg-orange-200">
                    <SwordsIcon className="w-5 h-5"/>  <>Join a challenge</> 
                    </Link>
                </span>
                <section>
                    <h2 className="text-xl font-extrabold mb-2">Habit Tasks</h2>
                    <h3 className="mb-4">Explore public habit tasks and show support by cheering users on</h3>
                    <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" >
                        {publicTasks.data ? publicTasks.data.map((task: iHabitTask) => (
                            <li key={task._id} className="mb-2">
                                <HabitTaskCard {...task} />
                            </li>
                        )) : <li>No public tasks available</li>}
                    </ul>
                </section>
            </div>
        );
    }


