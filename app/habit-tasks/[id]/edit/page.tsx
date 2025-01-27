import LifeDomainForm from "@/components/forms/life-domain-form";
import { auth } from "@/services/auth.nextauth";
import { redirect } from "next/navigation";
import { getLifeDomainById } from "./action";

export default async function EditHabitTask({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth");
    }

    const userId = session.user.id;
    const res = await getLifeDomainById(params.id); // Fetch the life domain by ID
    const lifeDomain  = await res.json()
    if (res.status != 200) {
        redirect("/habit-tasks")
    }
    if (!lifeDomain || lifeDomain.owner !== userId) {
        redirect("/habit-tasks"); // Redirect if the life domain doesn't belong to the user
    }

    return (
        <LifeDomainForm 
            type="Edit" 
            lfd={lifeDomain} 
        />
    );
}
