"use client";
import HabitTaskCard from "@/components/habit-task-card"
import { iHabitTask } from "@/components/tracker-calender"
import { useAuthStore } from "@/providers/auth-store-provider"
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
                console.log(res)
                if (response.ok) {
                    setHabitTasks(res.data)
                } else {
                    setError("Failed to fetch habit tasks")
                }
            } catch (error) {
                console.log(error)
                setError("Error fetching habit tasks")
            }
        }

        if (user) {
            fetchHabitTasks()
        }
    }, [user])

    if (error) {
        return (
            <div className="w-full">
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
        <div className="w-full">
            <span className="w-full flex items-center justify-between">
                <span className="">Build new habits one task at a time</span>
                <>{user ?
                    <Link
                        className="border border-black hover:border-gray-900 p-1 rounded-md"
                        href="/habit-tasks/new"
                    >
                        Add Habit task
                    </Link>
                    : <>Login</>
                }</>
            </span>
            <section className="w-full my-4 gap-2 grid grid-cols-1 md:grid-cols-3">
                {habitTasks.map((ht: iHabitTask) => (
                    <div key={ht._id} className="w-full flex flex-col">
                        <HabitTaskCard {...ht} />
                    </div>
                ))}
            </section>
        </div>
    )
}