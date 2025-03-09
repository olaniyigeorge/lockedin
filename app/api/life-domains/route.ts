import LifeDomain from "@/models/life-domain";
import { connectToDB } from "@/services/db_mongo";
import { getSessionData } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";
import { GetLifeDomainsResponse, PostLifeDomainRequest, PostLifeDomainResponse } from "./docs";
/**
 * Handles GET requests to fetch life domains filtered by owner.
 * @param request The incoming Next.js request object.
 * @returns A JSON response containing the filtered life domains or an error message.
 */
export async function GET(request: NextRequest): Promise<NextResponse<GetLifeDomainsResponse | { error: string }>> {
    try {
        const url = new URL(request.url);
        const owner = url.searchParams.get("owner");

        // Get session user (assumes you have a session handling method)
        const sessionData = await getSessionData(request);

        // Pagination parameters
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100); // Max limit = 100
        const skip = (page - 1) * limit;

        await connectToDB();

        let filter = {};
        if (owner) {
            console.log("Fetching life domains for owner:", owner);
            filter = { owner };
        } else {
            // Only allow fetching all life domains if the user is an admin
            if (!sessionData || sessionData.user.role !== "admin") {
                return NextResponse.json(
                    { 
                        message: "Unauthorized: You can't access all life domains",
                        data: null,
                        pagination : null,
                    },
                    { status: 403 },
                    

                );
            }
        }

        // Fetch total count for pagination
        const totalLifeDomains = await LifeDomain.countDocuments(filter);
        const totalPages = Math.ceil(totalLifeDomains / limit);

        // Fetch life domains with pagination
        const lifeDomains = await LifeDomain.find(filter).skip(skip).limit(limit);

        return NextResponse.json(
            {
                message: "Success",
                data: lifeDomains,
                pagination: {
                    totalLifeDomains,
                    totalPages,
                    currentPage: page,
                    limit
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching life domains:", error);
        return NextResponse.json(
            { error: "Failed to fetch life domains" },
            { status: 500 }
        );
    }
}


/**
 * Handles POST requests to create a new life domain.
 * @param request The incoming Next.js request object.
 * @returns A JSON response containing the newly created life domain or an error message.
 */
export async function POST(request: NextRequest): Promise<NextResponse<PostLifeDomainResponse | { error: string }>> {
    const sessionData = await getSessionData(request);
    try {
        const { name, description, owner }: PostLifeDomainRequest = await request.json();

        if (!name || !description || !owner) {
            return NextResponse.json(
                { 
                    message: "Missing required fields",
                    data: null
                 },
                { status: 400 }
            );
        }
        if (sessionData?.user.id !== owner) {
            return NextResponse.json(
                { 
                    message: "You are not authorised to make this life domain. Sign in",
                    data: null
                 },
                { status: 401 }
            );
        }

        await connectToDB();

        const newLifeDomain = new LifeDomain({ name, description, owner });
        await newLifeDomain.save();

        return NextResponse.json(
            {
                message: "Successfully created life domain",
                data: newLifeDomain
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating life domain:", error);
        return NextResponse.json(
            { error: "Failed to create life domain" },
            { status: 500 }
        );
    }
}
