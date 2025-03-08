import Waitlist from "@/models/waitlist";
import { connectToDB } from "@/services/db_mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { full_name, email, discovery_location } = await req.json();

        if (!full_name || !email) {
            return NextResponse.json(
                { error: "Both full_name and email_address are required." },
                { status: 400 }
            );
        }

        await connectToDB();

        const existingEntry = await Waitlist.findOne({ email });

        if (existingEntry) {
            console.log("Already joined: ", existingEntry);
            return NextResponse.json(
                { message: "A waitlist entry with this email already exists" },
                { status: 200 }
            );
        }

        const newEntry = await Waitlist.create({
            full_name,
            email,
            discovery_location
        });

        return NextResponse.json(
            {
                message: "Successfully added to the waitlist!",
                newEntry
            },
            { status: 201 }
        );
    } catch (error) {
        // TODO: Add logging 
        console.error(error)
        return NextResponse.json(
            { error: "Failed to process the request." },
            { status: 500 }
        );
    }
}



// TODO: Updating models with running into failed validation