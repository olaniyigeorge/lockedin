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
            return new Response("You have joined with this email", { status: 200 });
        }

        // Create a new Waitlist
        const newEntry = await Waitlist.create({
            email,
            discovery_location
        });

        return new Response(JSON.stringify(newEntry),{ status: 201 })
    } catch (error) {
        console.error(error);
        NextResponse.json(
            { body: "Failed to join waitlist" },
            { status: 500 }
        );
    }
}
