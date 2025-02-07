"use client";
import HabitTaskCard from "@/components/habit-task-card"
import { iHabitTask } from "@/components/tracker-calender"
import { useAuthStore } from "@/providers/auth-store-provider"
import { CalendarPlusIcon } from "lucide-react";
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HabitTasksPage() {
    const { user } = useAuthStore((state) => state)
    const [habitTasks, setHabitTasks] = useState<iHabitTask[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchHabitTasks = async () => {
            try {
                const response = await fetch(`/api/habit-tasks?owner=${user!.id}`, {
                    method: "GET",
                })
                const res = await response.json()
                if (response.ok) {
                    setHabitTasks(res.data)
                } else {
                    setError("Failed to fetch habit tasks")
                }
            } catch (error) {
                console.error(error)
                setError("Error fetching habit tasks")
                throw new Error("Error fetching habit tasks")
            }
        }

        if (user) {
            fetchHabitTasks()
        }
    }, [user])

    if (error) {
        return (
            <div className="w-full p-2 md:p-4">
                <span className="w-full flex items-center justify-between">
                    <>Habit Tasks</>
                    <>{user ?
                        <Link href="/i/lockedin/habit-tasks/new"> Add habit task</Link>
                        : <>Login</>
                    }</>
                </span>
                <section className="w-full grid grid-cols-1 md:grid-cols-3">
                    Error {error}
                </section>
            </div>
        )
    }

    return (
        <div className="w-full p-2 md:p-4">
            <span className="w-full flex gap-4 justify-center items-center">
                <h1 className="text-2xl md:text-3xl font-bold">Habit Tasks</h1>
                <>{user ?
                    <Link 
                        className=""
                        href="/habit-tasks/new"
                    > 
                        <CalendarPlusIcon className="w-8 h-8 text-green-500"/>
                    </Link>
                :   <Link href="/onboarding/waitlist" className="light_btn"> 
                        
                    </Link>
                }</>
            </span>
            <p className="mt-4 text-gray-600 text-lg md:text-2xl lg:text-3xl text-center">
                A habit task is a specific action or behavior that you want to turn into a habit. 
                By consistently completing these tasks, you can build new habits and improve your life domains.
            </p>
            <section className="w-full my-6 gap-2 grid grid-cols-1 md:grid-cols-3">
                {
                    habitTasks.length > 0 ? (
                        <>
                            {habitTasks.map((ht: iHabitTask) => (
                                <div key={ht._id} className="w-full flex flex-col">
                                    <HabitTaskCard {...ht} />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="flex min-h-[300px] gap-3 justify-center items-center border w-screen">
                            <Link href="/onboarding/waitlist" className="flex gap-2 w-fit items-center border hover:border-green-500 glassimorphism p-3">
                                <CalendarPlusIcon className="w-8 h-8 text-green-500"/>
                                <>Add Habit Task</>
                            </Link>
                        </div>
                    )
                }
            </section>
        </div>
    )
}