import LifeDomain from "@/models/lockedin.life-domain";
import { connectToDB } from "@/services/db_mongo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
       // Parse the URL to get query parameters
        const url = new URL(request.url);
        const filter : 'owner' | 'id' | null = null
        const owner = url.searchParams.get("owner");
        const id = url.searchParams.get("id"); 

        if (owner) {
            console.log("Getting life domains from this user")
            await connectToDB();
            const my_life_domains = await LifeDomain.find({ owner: owner }); // Use the extracted ID

            return NextResponse.json(
                {
                    message: "success",
                    my_life_domains
                },
                {
                    status: 200
                }
            )
        }

        return NextResponse.json(
            "No filter param", 
            { status: 400}
        ) 
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domains created by user", { status: 500 });
    }
}


// export async function PATCH(request: Request) {
//     const { name, description } = await request.json();

//     try {
//        // Parse the URL to get query parameters
//         const url = new URL(request.url);
//         const id = url.searchParams.get("id"); 

//         if (id) {
//             console.log("Getting this life domain")
//             await connectToDB();
//             const life_domain = await LifeDomain.findById(id); 
            
//             if (!life_domain) {
//                 return new Response("Life domain not found", { status: 404 });
//             }

//             // Update the life domain data
//             life_domain.name = name;
//             life_domain.description = description;

//             await life_domain.save()

//             return new Response("Successfully updated life domain", { status: 200 })
//         }

//         return new Response("No filter param", { status: 400}) 
//     } catch (error) {
//         console.error(error);
//         return new Response("Failed to fetch life domains created by user", { status: 500 });
//     }
// }