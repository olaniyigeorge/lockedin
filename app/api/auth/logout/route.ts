import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Delete the session cookie by setting it to expire immediately
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
      httpOnly: true,
      path: "/",
      secure: true,
      maxAge: 0, // Expire immediately
    });

    return NextResponse.json(
      { message: "Successfully logged out" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
