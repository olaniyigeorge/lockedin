import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { encrypt } from "@/lib/utils";

const DOMAIN = process.env.DOMAIN as string;
const SESSION_VALIDITY_DURATION_IN_MINUTES = process.env.SESSION_VALIDITY_DURATION_IN_MINUTES as string;

export async function POST(req: NextRequest) {
    const {email, password } = await req.json()
    const sessionCookie = await cookies()
    try {
        console.log(`\n fetching signin \n`)
        const res = await fetch(`${DOMAIN}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        })
        console.log(`\n ${res}\n`)
        if (!res.ok) {
            return NextResponse.json(
                {"error": "An error occured while authenticating"}, {status: res.status})
        }
        const data = await res.json()
        const session = await encrypt(
            {
                expires: new Date(Date.now() + parseInt(SESSION_VALIDITY_DURATION_IN_MINUTES) * 60 * 1000),
                user: {
                    email: data.user.email,
                    username: data.user.username,
                    id: data.user._id
                }
            }
        )
    
        sessionCookie.set(
            "session", 
            session,
            {
                maxAge: parseInt(SESSION_VALIDITY_DURATION_IN_MINUTES) * 60,
                httpOnly: true,
                path: "/",
                secure: true
            })

        return NextResponse.json(
            {
                message: "Authentication Successfull",
                user: data.user
            },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            {"error": "An error occured while authenticating"}, 
            {status: 500}
        )
        
    }
}