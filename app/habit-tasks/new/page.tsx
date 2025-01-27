"use client"
import HabitTaskForm from "@/components/forms/habit-task-form";
import { redirect } from "next/navigation";
import { iLifeDomain } from "@/components/forms/life-domain-form";
import { useAuthStore } from "@/providers/auth-store-provider";
import { useEffect, useState } from "react";

export default function NewHabitTaskPage() {
    const { user } = useAuthStore((state) => state);
    const [aspects, setAspects] = useState<iLifeDomain[]>([]);


    useEffect(() => {
        const fetchAspects = async () => {
            try {
                const response = await fetch(`/api/life-domains?owner=${user!.id}`, {
                    method: "GET",
                });
                const res = await response.json();
                if (response.ok) {
                    setAspects(res.data);
                } else {
                    console.error("Failed to fetch aspects:", res);
                }
            } catch (error) {
                console.error("Error fetching aspects: ", error);
            }
        };
        fetchAspects();
    }, [user]);


    if (!user?.id) {
        redirect("/auth/signin");
    }

    return (
        <HabitTaskForm 
            type="Create"
            user={user!.id}
            task={{
                _id: "",
                aspect: "",
                owner: "",
                title: "",
                description: "",
                accessibility: "public",
                start_date: new Date(),
                end_date: new Date(new Date().setDate(new Date().getDate() + 21)),
            }} 
            aspects={aspects}        
        />
    );
}
