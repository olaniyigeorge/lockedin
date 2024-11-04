import LifeDomainForm from "@/components/lockedin/forms/life-domain-form";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function NewLifeDomain() {
    const session = await auth(); 
    
    // Redirect to the auth page if the user is not authenticated
    if (!session?.user?.id) {
        redirect("/auth");
    }
    const userId = session.user.id;
    return (
        <LifeDomainForm 
            type="Create" 
            user={userId} 
            lfd={{
                name: "",
                description: "",
                owner: userId
            }}
        />
    );
}
