import LifeDomain from "@/models/life-domain";
import { connectToDB } from "@/services/db_mongo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
       // Parse the URL to get query parameters
        const url = new URL(request.url);
        const owner = url.searchParams.get("owner");

        if (owner) {
            console.log("Getting life domains from this user")
            await connectToDB();
            const my_life_domains = await LifeDomain.find({ owner: owner }); // Use the extracted ID

            return NextResponse.json(
                {
                    message: "success",
                    data: my_life_domains
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


export async function PATCH(request: Request) {
    const { name, description } = await request.json();

    try {
       // Parse the URL to get query parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("id"); 

        if (id) {
            console.log("Getting this life domain")
            await connectToDB();
            const life_domain = await LifeDomain.findById(id); 
            
            if (!life_domain) {
                return new Response("Life domain not found", { status: 404 });
            }

            // Update the life domain data
            life_domain.name = name;
            life_domain.description = description;

            await life_domain.save()

            return new Response("Successfully updated life domain", { status: 200 })
        }

        return new Response("No filter param", { status: 400}) 
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domains created by user", { status: 500 });
    }
}
export async function POST(request: Request) {
    const { name, description, owner } = await request.json();

    try {
        await connectToDB();

        const newLifeDomain = new LifeDomain({
            name,
            description,
            owner
        });

        console.log("\n\n", newLifeDomain, "\n\n")

        await newLifeDomain.save();

        return NextResponse.json(
            {
                message: "Successfully created life domain",
                data: newLifeDomain
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to create life domain"},
            { status: 500 }
        );
    }
}