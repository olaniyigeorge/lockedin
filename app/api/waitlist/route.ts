import Waitlist from "@/models/waitlist";
import { connectToDB } from "@/services/db_mongo";
import { NextRequest, NextResponse } from "next/server";
import { GetWaitlistResponse, WaitlistEntry, WaitlistResponse, WaitlistPayload, WaitlistFilterPayload } from "./docs";


export async function POST(req: NextRequest): Promise<NextResponse<WaitlistResponse>> {
    try {
        const { full_name, email, discovery_location }: WaitlistPayload = await req.json();

        if (!full_name || !email) {
            return NextResponse.json(
                { error: "Both full_name and email are required." },
                { status: 400 }
            );
        }

        await connectToDB();

        // Check if the email is already in the waitlist
        const existingEntry = await Waitlist.findOne({ email });

        if (existingEntry) {
            return NextResponse.json(
                { 
                    message: "A waitlist entry with this email already exists.",
                    entry: existingEntry
                },
                { status: 409 }
            );
        }

        // Create new waitlist entry
        const newEntry: WaitlistEntry = await Waitlist.create({
            full_name,
            email,
            discovery_location
        });

        return NextResponse.json(
            {
                message: "Successfully added to the waitlist!",
                entry: newEntry
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to process the request." },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest): Promise<NextResponse<GetWaitlistResponse>> {
    try {
        const url = new URL(req.url)
        await connectToDB();

        // Extract query parameters
        const { search, discovery_location, startDate, endDate }: WaitlistFilterPayload = Object.fromEntries(req.nextUrl.searchParams);
        
        // Pagination parameters
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100); // Max limit = 100

        // Build the query object
        let query: any = {};

        if (search) {
            query.$or = [
                { full_name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        if (discovery_location) {
            query.discovery_location = discovery_location;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        // Fetch goals with pagination
        const totalWaitlisters = await Waitlist.countDocuments(query);
        const totalPages = Math.ceil(totalWaitlisters / limit);

        const waitlistEntries = await Waitlist.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);;

        return NextResponse.json({
            message: "Waitlist entries retrieved successfully",
            entries: waitlistEntries,
            pagination: {totalWaitlisters, totalPages, currentPage: page, limit }

        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch waitlist entries." }, { status: 500 });
    }
}
