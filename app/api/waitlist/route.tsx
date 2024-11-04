import { NextResponse } from "next/server";

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
