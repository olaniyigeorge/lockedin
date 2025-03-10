import { NextResponse, NextRequest } from 'next/server';
import { connectToDB } from '@/services/db_mongo';
import LifeDomain from '@/models/life-domain';
import { getSessionData } from '@/utils/helpers';
import { LifeDomainType } from './docs';

/**
 * @description Fetch a single life domain by ID
 * @param request - Incoming request object
 * @returns JSON response with life domain data or error message
 */
export async function GET(request: NextRequest): Promise<NextResponse<{ message: string; data?: LifeDomainType }>> {
    const sessionData = await getSessionData(request);
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ message: "No ID provided" }, { status: 400 });
        }

        await connectToDB();
        const lifeDomain = await LifeDomain.findById(id);

        if (!lifeDomain) {
            return NextResponse.json({ message: "Life domain not found" }, { status: 404 });
        }
        if (sessionData?.user.id !== lifeDomain.owner && sessionData?.user.role !== "admin") {
            return NextResponse.json({ message: "You are not authorised to view this life domain" }, { status: 401 });
        }

        return NextResponse.json({ message: "Success", data: lifeDomain }, { status: 200 });

    } catch (error) {
        console.error("Error fetching life domain:", error);
        return NextResponse.json({ message: "Failed to fetch life domain" }, { status: 500 });
    }
}

/**
 * @description Update a life domain (only owner or admin can update)
 * @param request - Incoming request object
 * @returns Response indicating success or failure
 */
export async function PATCH(request: NextRequest): Promise<NextResponse<{ message: string } | { error: string }>> {
    // const sessionData = await getSessionData(request);
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ message: "No ID provided" }, { status: 400 });
        }

        const { name, description } = await request.json();
        const sessionData = await getSessionData(request);

        await connectToDB();
        const lifeDomain = await LifeDomain.findById(id);

        if (!lifeDomain) {
            return NextResponse.json({ message: "Life domain not found" }, { status: 404 });
        }

        // Check if the user is the owner or an admin
        if (sessionData?.user.role !== "admin" && sessionData?.user.id !== lifeDomain.owner) {
            return NextResponse.json({ message: "Unauthorized: You can only update your own life domains" }, { status: 403 });
        }

        lifeDomain.name = name;
        lifeDomain.description = description;
        await lifeDomain.save();

        return NextResponse.json({ message: "Successfully updated life domain" }, { status: 200 });

    } catch (error) {
        console.error("Error updating life domain:", error);
        return NextResponse.json({ error: "Error while attempting life domain update" }, { status: 500 });
    }
}

/**
 * @description Delete a life domain (only owner or admin can delete)
 * @param request - Incoming request object
 * @returns Response indicating success or failure
 */
export async function DELETE(request: NextRequest): Promise<NextResponse<{ message: string }| null | {error: string}>> {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ message: "No ID provided" }, { status: 400 });
        }

        const sessionData = await getSessionData(request);

        await connectToDB();
        const lifeDomain = await LifeDomain.findById(id);

        if (!lifeDomain) {
            return NextResponse.json({ message: "Life domain not found" }, { status: 404 });
        }

        // Check if the user is the owner or an admin
        if (sessionData?.user.role !== "admin" && sessionData?.user.id !== lifeDomain.owner) {
            return NextResponse.json({ message: "Unauthorized: You can only delete your own life domains" }, { status: 403 });
        }

        await LifeDomain.findByIdAndDelete(id);

        return new NextResponse(null, {status: 204 });

    } catch (error) {
        console.error("Error deleting life domain:", error);
        return NextResponse.json(
            { 
                error: "Error while attempting life domain deletion",
            },
            { status: 500 }
        );
    }
}
