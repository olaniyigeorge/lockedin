import LifeDomainForm from "@/components/forms/life-domain-form";

export default async function NewLifeDomain() {
    return (
        <LifeDomainForm 
            type="Create" 
            lfd={{
                name: "",
                description: "",
                owner: ""
            }}
        />
    );
}
