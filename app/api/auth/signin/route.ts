import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import { encrypt } from "@/utils/helpers";
import { AuthenticatedUser, AuthPayload, AuthResponse } from "./docs";


const DOMAIN = process.env.DOMAIN as string;
const SESSION_VALIDITY_DURATION_IN_MINUTES = process.env.SESSION_VALIDITY_DURATION_IN_MINUTES as string;

export async function POST(req: NextRequest): Promise<NextResponse<AuthResponse>> {
    const req_body: AuthPayload = await req.json()
    const sessionCookie = await cookies()
    try {
        const res = await fetch(`${DOMAIN}/api/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: req_body.email, 
                password: req_body.password
            })
        })

        if (!res.ok) {
            return NextResponse.json(
                {error: "An error occured while fetching user"}, 
                {status: res.status})
        }
        const data = await res.json()
        const cleanedUser: AuthenticatedUser = {
            _id: data.user._id,
            email: data.user.email,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            username: data.user.username,
            image: data.user.image,
            isVerified: data.user.isVerified,
            role: data.user.role
        };
        const session = await encrypt(
            {
                expires: new Date(Date.now() + parseInt(SESSION_VALIDITY_DURATION_IN_MINUTES) * 60 * 1000),
                user: {
                    email: data.user.email,
                    username: data.user.username,
                    role: data.user.role,
                    id: data.user._id
                }
            }
        )
    
        // Set  session cookie
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
                user: cleanedUser
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {error: "An error occured while authenticating"}, 
            {status: 500}
        )
        
    }
}
