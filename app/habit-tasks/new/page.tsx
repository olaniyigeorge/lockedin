import HabitTaskForm from "@/components/forms/habit-task-form";
import { auth } from "@/services/auth.nextauth";
import { redirect } from "next/navigation";
import { getLifeDomains } from "../../life-domains/action";
import { iLifeDomain } from "@/components/forms/life-domain-form";

export default async function NewHabitTaskPage() {
    const session = await auth(); 
    
    // Redirect to the auth page if the user is not authenticated
    if (!session?.user?.id) {
        redirect("/auth");
    }
    const userId = session.user.id;
    let ASPECTS: iLifeDomain[] = []

    try {
        const response = await getLifeDomains()
        const res = await response.json()

        if (response.status == 200) {
            console.log("returned aspects ", res.length)
            ASPECTS = res
        } else{
            console.log("Error while getting aspects")
        }
    }catch(error) {
        console.log("Error", error)
    }




    return (
        <HabitTaskForm 
            type="Create"
            user={userId}
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
            aspects={ASPECTS}        
        />
    );
}
