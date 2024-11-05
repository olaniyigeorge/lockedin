import LifeDomainForm, { iLifeDomain } from "@/components/forms/life-domain-form";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getHabitTaskById } from "./action";
import HabitTaskForm from "@/components/forms/habit-task-form";
import { getLifeDomains } from "@/app/life-domains/action";

export default async function EditHabitTask({ params }: { params: { id: string } }) {
    const session = await auth();


    if (!session?.user?.id) {
        redirect("/sign-in");
    }

    const userId = session.user.id;
    const res = await getHabitTaskById(params.id); // Fetch the life domain by ID
    const habitTask  = await res.json()
    if (res.status != 200) {
        redirect("/habit-tasks")
    }


    console.log("Task: ", habitTask)
    let ASPECTS: iLifeDomain[] = []
    try {
        const response = await getLifeDomains()
        const res = await response.json()

        if (response.status == 200) {
            ASPECTS = res
        } else{
            console.log("Error while getting aspects")
        }
    }catch(error) {
        console.log("Error")
    }

    return (
        <HabitTaskForm 
            type="Edit"
            user={userId}
            task={habitTask} 
            aspects={ASPECTS}        
        />
    );
}
