"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { iLifeDomain } from "./life-domain-form";

interface iHabitTask {
    _id: string;
    aspect: string;
    owner: string;
    title: string;
    description: string;
    accessibility: "public" | "private" | "partnership";
    start_date: Date;
    end_date: Date;
}

interface HabitTaskFormProps {
    type: "Create" | "Edit";
    user: string;
    aspects: iLifeDomain[];
    task: iHabitTask;
}

export default function HabitTaskForm({ type, user, aspects, task }: HabitTaskFormProps) {
    const router = useRouter();
    const [habitTask, setHabitTask] = useState<iHabitTask>({
        _id: "",
        aspect: "",
        owner: user,
        title: "",
        description: "",
        accessibility: "public",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 21)),
    });
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (type === "Edit") {
            setHabitTask(task); // Reset form state when task changes
        }
    }, [task, type]);

    const createHabitTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            console.log("HBTK: ", habitTask)
            const response = await fetch(`/api/lockedin/habit-tasks/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(habitTask),
            });

            if (response.ok) {
                toast.success("Habit Task created");
                router.push('/i/lockedin/habit-tasks');
            } else {
                toast.error(`Error ${response.status} while creating habit task`);
            }
        } catch (error) {
            toast.error("Error while creating habit task");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const editHabitTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/habit-tasks/${task._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(habitTask),
            });

            if (response.ok) {
                toast.success("Habit Task updated");
                router.push('/i/habit-tasks');
            } else {
                toast.error(`Error ${response.status} while updating habit task`);
            }
        } catch (error) {
            toast.error("Error while updating habit task");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl lockedin_purple_gradient font-extrabold">{type} Habit Task</h1>
            <form className="w-full glassmorphism text-gray-800 p-3 md:p-5 flex gap-2 flex-col  border border-gray-900 rounded-xl" onSubmit={(e) => {
                if (type === "Create") {
                    createHabitTask(e);
                } else if (type === "Edit") {
                    editHabitTask(e);
                }
            }}>
                <span className="w-full flex justify-between">
                     <select
                        className="p-2 text-xs w-fit rounded-full"
                        name="aspect"
                        value={habitTask.aspect}
                        onChange={(e) => setHabitTask({ ...habitTask, aspect: e.target.value })}
                        required
                    >
                        <option value="" disabled>Life domains</option>
                        {aspects.map((aspect) => (
                            <option key={aspect._id} value={aspect._id}>{aspect.name}</option>
                        ))}
                    </select>

                    <select
                        className="p-2 text-xs rounded-full"
                        name="accessibility"
                        value={habitTask.accessibility}
                        onChange={(e) => setHabitTask({ ...habitTask, accessibility: e.target.value as "public" | "private" | "partnership" })}
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="partnership">Partnership</option>
                    </select>

                </span>
               
                <input
                    className="p-2 rounded-md"
                    type="text"
                    name="title"
                    value={habitTask.title}
                    onChange={(e) => setHabitTask({ ...habitTask, title: e.target.value })}
                    placeholder="Title of the habit task"
                    required
                />
                <textarea
                    className="p-2 rounded-md "
                    name="description"
                    value={habitTask.description}
                    onChange={(e) => setHabitTask({ ...habitTask, description: e.target.value })}
                    placeholder="Describe the habit task and what you want to achieve."
                    required
                />


                <div className="w-full flex justify-between items-center">
                    <input
                    className="p-2 rounded-md"
                    type="date"
                    name="start_date"
                    value={habitTask.start_date.toISOString().split("T")[0]} // Format date for input
                    onChange={(e) => setHabitTask({ ...habitTask, start_date: new Date(e.target.value) })}
                />
                <input
                    className="p-2 rounded-md"
                    type="date"
                    name="end_date"
                    value={habitTask.end_date.toISOString().split("T")[0]} // Format date for input
                    onChange={(e) => setHabitTask({ ...habitTask, end_date: new Date(e.target.value) })}
                />
                </div>
            
                <span className="w-full flex justify-center">
                    <button
                        type="submit"
                        disabled={submitting}
                        className='border  hover:bg-gray-950 py-2 px-4 md:px-8 w-fit justify-end rounded-md text-white'
                    >
                        {submitting ? `${type}ing...` : type}
                    </button>
                </span>

                
            </form>
        </div>
    );
}
