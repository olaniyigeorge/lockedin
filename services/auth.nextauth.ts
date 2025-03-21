import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/helpers";
import { AuthenticatedUser, AuthPayload, AuthResponse } from "@/app/api/auth/signin/docs";
// import { AuthenticatedUser, AuthPayload, AuthResponse } from "./docs";

const DOMAIN = process.env.DOMAIN as string;
const SESSION_VALIDITY_DURATION_IN_MINUTES = process.env
    .SESSION_VALIDITY_DURATION_IN_MINUTES as string;




/**
 * ======================================================
 *                      SIGN-OUT 
 * ======================================================
 */

export async function signout(request: NextRequest): Promise<NextResponse> {
    /**
     * Wipes session from cookies and removes session from header
     */
    const sessionCookie = await cookies();

    // Clear session cookie
    sessionCookie.set("session", "", {
        maxAge: -1,
        httpOnly: true,
        path: "/",
        secure: true,
    });

    // Create response
    const response = NextResponse.json(
        { message: "Sign-out successful" },
        { status: 200 }
    );

    // Remove token from header
    response.headers.delete("token");

    return response;
}




/**
 * ======================================================
 *                      SIGN-IN 
 * ======================================================
 */
export async function signin(
  req: NextRequest
): Promise<NextResponse<AuthResponse>> {
  const req_body: AuthPayload = await req.json();
  const sessionCookie = await cookies();
  try {
    const res = await fetch(`${DOMAIN}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: req_body.email,
        password: req_body.password,
      }),
    });

    if (!res.ok) {
      const resp = await res.json()
      return NextResponse.json(
        { error: `${resp.error}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    const cleanedUser: AuthenticatedUser = {
      _id: data.user._id,
      email: data.user.email,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      username: data.user.username,
      image: data.user.image,
      isVerified: data.user.isVerified,
      role: data.user.role,
    };
    const session = await encrypt({
      expires: new Date(
        Date.now() + parseInt(SESSION_VALIDITY_DURATION_IN_MINUTES) * 60 * 1000
      ),
      user: {
        email: data.user.email,
        username: data.user.username,
        role: data.user.role,
        id: data.user._id,
      },
    });

    // Set  session cookie
    sessionCookie.set("session", session, {
      maxAge: parseInt(SESSION_VALIDITY_DURATION_IN_MINUTES) * 60,
      httpOnly: true,
      path: "/",
      secure: true,
    });

 
    // You CANNOT set headers on `req` directly.
    // Instead, set headers on your response:
    const response = NextResponse.json(
      {
        message: "Authentication Successfull",
        user: cleanedUser,
      },
      { status: 200 }
    );
    // Set token in header
    response.headers.set("token", session);

    return response
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: `${error}` },
      { status: 500 }
    );
  }
}
















// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
// import GitHub from "next-auth/providers/github"

// import { connectToDB } from "./db_mongo"
// import User from "@/models/user"


// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Google, GitHub],
//   callbacks: {
//     async signIn({profile}) {
//       try {
//         console.log("....connecting to db")
//         await connectToDB()

//         // check if user exists
//         const userExists = await User.findOne({
//           email: profile?.email
//         })

//         // if not, create new user
//         if (!userExists) {
//           await User.create( {
//             email: profile?.email,
//             username: profile?.name?.replace(" ", "").toLowerCase(),
//             image: profile?.picture
//           })
//         }

//         return true
//       } catch(error) {
//         console.log(error)
//         return false
//       }
//     },
//     async session({session}) {
//       const sessionUser = await User.findOne({
//         email: session.user.email
//       })
//       session.user.id = sessionUser._id.toString();

//       return session
//     }
//   }
// })


// export const providers = [
//   {
//     id: "google",
//     name: "Google",
//   },
// ];