import { NextResponse } from 'next/server';
import { connectToDB } from '@/services/db_mongo';
import LifeDomain from '@/models/life-domain';

export async function GET(request: Request) {
    try {
        // Parse the URL to get the dynamic ID
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (id) {
            console.log(`Getting life domain with ID: ${id}`);
            await connectToDB();
            const lifeDomain = await LifeDomain.findById(id); // Use the extracted ID

            if (lifeDomain) {
                return NextResponse.json(
                    {
                        message: "success",
                        data: lifeDomain
                    },
                    {
                        status: 200
                    }
                );
            } else {
                return NextResponse.json(
                    {
                        message: "Life domain not found"
                    },
                    {
                        status: 404
                    }
                );
            }
        }

        return NextResponse.json(
            {
                message: "No ID provided"
            },
            {
                status: 400
            }
        );
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domain", { status: 500 });
    }
}