import LifeDomain from "@/models/lockedin.life-domains";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {

    try {
       // Parse the URL to get query parameters
        const url = new URL(request.url);
        const filter : 'owner' | 'id' | null = null
        const owner = url.searchParams.get("owner"); // Extract the owner from query parameters
        const id = url.searchParams.get("id"); // Extract the owner from query parameters

        if (owner) {
            console.log("Getting life domains from this user")
            await connectToDB();
            const my_life_domains = await LifeDomain.find({ filter}); // Use the extracted ID

            // const my_life_domains = await LifeDomain.find({ owner: id }); // Use the extracted ID
            // const my_life_domains = lfs // Use the extracted ID
            return new Response(JSON.stringify(my_life_domains), { status: 200 })
        //     return new Response("Owner ID is required", { status: 400 });
        }

        if (id) {
            console.log("Getting this life domain")
            await connectToDB();
            const life_domain = await LifeDomain.findById(id); // Use the extracted ID
            // const my_life_domains = await LifeDomain.find({ owner: id }); // Use the extracted ID
            // const my_life_domains = lfs // Use the extracted ID
            return new Response(JSON.stringify(life_domain), { status: 200 })
            //return new Response("Owner ID is required", { status: 400 });
        }

        // const my_life_domains = await LifeDomain.find({ owner: id }); // Use the extracted ID
        // const my_life_domains = lfs // Use the extracted ID
        return new Response("No filter param", { status: 400})

        
       
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domains created by user", { status: 500 });
    }
}



const lfs = [
    {
        "id": 1,
        "name": "Financials",
        "description": "My goals towards my financial life",
        "user": "1a9be89a-058e-4023-b42c-cce288fd979b"
    },
    {
        "id": 2,
        "name": "Olaniyi George",
        "description": "vvvrv",
        "user": "ccfd6f45-81e1-42bf-bb38-e121c94700d8"
    },
    {
        "id": 3,
        "name": "Financialsssspppp",
        "description": "My goals towards my financial life",
        "user": "1a9be89a-058e-4023-b42c-cce288fd979b"
    },
    {
        "id": 4,
        "name": "Financialssss",
        "description": "My goals towards my financial life",
        "user": "1a9be89a-058e-4023-b42c-cce288fd979b"
    },
    {
        "id": 5,
        "name": "Health",
        "description": "My medical well being",
        "user": "1a9be89a-058e-4023-b42c-cce288fd979b"
    },
    {
        "id": 6,
        "name": "Personal",
        "description": "Being sober for a month",
        "user": "1a9be89a-058e-4023-b42c-cce288fd979b"
    },
    {
        "id": 7,
        "name": "Personals",
        "description": "Being sober for a month",
        "user": "1a9be89a-058e-4023-b42c-cce288fd979b"
    },
    {
        "id": 8,
        "name": "Testing",
        "description": "hfdwehfbrhbiqker",
        "user": "41d45d2a-d350-4201-9999-3fae6a087264"
    }
]