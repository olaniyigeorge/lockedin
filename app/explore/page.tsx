import { iHabitTask } from "@/components/tracker-calender";
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
            <h1 className="text-3xl font-bold mb-4">Explore</h1>
            <span className="flex space-x-4 mb-4">
                <Link href="/habit-tasks" className="text-blue-500 hover:underline">
                    Your Habit Tasks
                </Link>
                <Link href="/life-domains" className="text-blue-500 hover:underline">
                    Your Life Domains
                </Link>
            </span>
            <section>
                <h2 className="text-xl font-semibold mb-2">Habit Tasks</h2>
                <h3 className="text-lg mb-4">Explore public habit tasks and show support by cheering users on</h3>
                <ul className="list-disc pl-5">
                    {publicTasks.data ? publicTasks.data.map((task: iHabitTask) => (
                        <li key={task._id} className="mb-2">
                            <Link href={`/habit-tasks/${task._id}`} className="text-blue-500 hover:underline">
                                {task.title}
                            </Link>
                        </li>
                    )) : <li>No public tasks available</li>}
                </ul>
            </section>
        </div>
    );
}


