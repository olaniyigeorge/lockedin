import LifeDomainDetails from "@/components/life-domain-details";

interface iLifeDomain {
    _id: string;
    name: string;
    description: string;
}

export default async function LifeDomainPage({params,}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    let lifeDomain: iLifeDomain | null = null;
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/life-domains/${id}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            lifeDomain = data.data
        } else {
            lifeDomain = null
        }
    } catch (err) {
        console.log(err);
        lifeDomain = null
        
    }

    if (!lifeDomain) {
        return <div>Life Domain not found</div>;
    }

    return ( 
        <LifeDomainDetails 
            {...lifeDomain} 
        />
     );
}
