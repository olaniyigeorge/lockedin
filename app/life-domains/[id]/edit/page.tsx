import LifeDomainForm from "@/components/forms/life-domain-form";
import { auth } from "@/services/auth.nextauth";
import { redirect } from "next/navigation";
import { getLifeDomainById } from "./action";

export default async function EditLifeDomain({ params }: { params: { id: string } }) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth");
    }

    const userId = session.user.id;
    const res = await getLifeDomainById(params.id); // Fetch the life domain by ID
    const lifeDomain  = await res.json()
    if (res.status != 200) {
        redirect("/life-domain")
    }
    if (!lifeDomain || lifeDomain.owner !== userId) {
        redirect("/life-domains"); // Redirect if the life domain doesn't belong to the user
    }

    return (
        <LifeDomainForm 
            type="Edit" 
            user={userId} 
            lfd={lifeDomain} 
        />
    );
}
