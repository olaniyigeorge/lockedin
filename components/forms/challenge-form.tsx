"use client";

import { ChallengeData, createChallenge } from "@/app/challenge/actions";
import { useAuthStore } from "@/providers/auth-store-provider";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HabitTask {
    _id: string;
    title: string;
}

export default function ChallengeForm() {
    const user = useAuthStore((state) => state.user);
    const [habitTasks, setHabitTasks] = useState<HabitTask[]>([]);
    const [selectedTask, setSelectedTask] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [aspect, setAspect] = useState<string>("");
    const [accessibility, setAccessibility] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [wager, setWager] = useState<number>(0);


    
    useEffect(() => {
        const fetchHabitTasks = async () => {
            try {
                const response = await fetch(`/api/habit-tasks?owner=${user!.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setHabitTasks(data.data);
                } else {
                    console.error("Failed to fetch habit tasks");
                }
            } catch (error) {
                console.error("Error fetching habit tasks", error);
            }
        };

        if (user) {
            fetchHabitTasks();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p>You need to be logged in to create a challenge</p>
                <Link 
                    href="/onboarding/waitlist"
                    className="px-4 py-2 mt-4 text-white bg-orange-500 rounded hover:bg-orange-600"
                >
                    Early Access
                </Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const challengeData: ChallengeData = {
            wager_amount: wager,
            owner_name: user!.username || "",
            title,
            description,
            aspect,
            accessibility,
            owner: user!.id || "",
            habit: selectedTask,
            start_date: new Date(startDate),
            end_date: new Date(endDate)
        };

        try {
            if (user?.id) {
                const challenge = await createChallenge(user.id, challengeData);
                console.log("Challenge created:", challenge);
            } else {
                console.error("User ID is undefined");
            }
        } catch (error) {
            console.error("Error creating challenge", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="my-4 max-w-lg mx-auto p-4 border rounded shadow-md space-y-4">
            <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            required
            className="w-full p-2 border rounded"
            >
            <option value="" disabled>Select a habit task</option>
            {habitTasks.map((task) => (
                <option key={task._id} value={task._id}>{task.title}</option>
            ))}
            </select>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full p-2 border rounded"
            />
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full p-2 border rounded"
            />
            <select
            value={aspect}
            onChange={(e) => setAspect(e.target.value)}
            required
            className="w-full p-2 border rounded"
            >
            <option value="" disabled>Select an aspect</option>
            <option value="Health">Health</option>
            <option value="Productivity">Productivity</option>
            <option value="Finance">Finance</option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="Other">Other</option>
            </select>
            <select
            value={accessibility}
            onChange={(e) => setAccessibility(e.target.value)}
            required
            className="w-full p-2 border rounded"
            >
            <option value="" disabled>Select accessibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            </select>
            <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
            />
            <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
            />
            <input
            type="number"
            value={wager}
            onChange={(e) => setWager(Number(e.target.value))}
            placeholder="Wager Amount"
            required
            className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full p-2  orange_gradient_bg text-white rounded-md hover:font-medium hover:scale-[102%] duration-500 transition-all ease-in-out ">
                Create Challenge
            </button>
        </form>
    );
}
