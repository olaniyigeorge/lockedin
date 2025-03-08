import LifeDomain from "@/models/life-domain";
import { connectToDB } from "@/services/db_mongo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
        const url = new URL(request.url);
        const owner = url.searchParams.get("owner");

        if (owner) {
            console.log("Getting life domains for this user... \n")
            await connectToDB();
            const my_life_domains = await LifeDomain.find({ owner: owner });

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

export async function POST(request: Request) {
    const { name, description, owner } = await request.json();

    try {
        await connectToDB();

        const newLifeDomain = new LifeDomain({
            name,
            description,
            owner
        });

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