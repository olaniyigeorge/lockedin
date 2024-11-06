import Waitlist from "@/models/lockedin.waitlist";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    try {
        // Parse the body once
        const body = await request.json();
        const { email, discovery_location } = body;
        
        await connectToDB();


        // Check for existing entry
        const existingEntry = await Waitlist.findOne({
            email,
            discovery_location
        });

        if (existingEntry) {
            console.log("Already joined: ", existingEntry)
            return new Response("You have joined with this email", { status: 409 }); // Conflict status
        }

        // Create a new Waitlist
        const newEntry = await Waitlist.create({
            email,
            discovery_location
        });

        return new Response(JSON.stringify(newEntry), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to join waitlist", { status: 500 });
    }
}



export async function POST(req: Request) {
    // Parse the body once
    const body = await req.json();
    const { email, discovery_location } = body;

    if (!email) {
        return NextResponse.json(
            { error: "Add email to request", body: null },
            { status: 400 }
        );
    }

    const url = `${process.env.API_DOMAIN}/accounts/waitlist`;
    console.log(JSON.stringify({
        email,
        telegram_id: null,
        discovery_location,
    }))
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                telegram_id: null,
                discovery_location: discovery_location,
            }),
        });

        const jsonResponse = await response.json();
        
        return NextResponse.json(
            { body: jsonResponse },
            { status: response.status }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
