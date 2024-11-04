import LifeDomainForm from "@/components/lockedin/forms/life-domain-form";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getLifeDomainById } from "./action";

export default async function EditHabitTask({ params }: { params: { id: string } }) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth");
    }

    const userId = session.user.id;
    const res = await getLifeDomainById(params.id); // Fetch the life domain by ID
    const lifeDomain  = await res.json()
    if (res.status != 200) {
        redirect("i/lockedin/habit-tasks")
    }
    if (!lifeDomain || lifeDomain.owner !== userId) {
        redirect("/i/lockedin/habit-tasks"); // Redirect if the life domain doesn't belong to the user
    }

    return (
        <LifeDomainForm 
            type="Edit" 
            user={userId} 
            lfd={lifeDomain} 
        />
    );
}
