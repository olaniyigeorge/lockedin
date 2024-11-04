import HabitTaskForm from "@/components/lockedin/forms/habit-task-form";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getLifeDomains } from "../../life-domains/action";
import { iLifeDomain } from "@/components/lockedin/forms/life-domain-form";

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
        console.log("Error")
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
