import { NextRequest, NextResponse } from "next/server";
import Log from "@/models/log";
import { connectToDB } from "@/services/db_mongo";

const NODE_ENV = process.env.NODE_ENV as string;

export async function POST(req: NextRequest) {
  try {
    const {user, details}: {user: string, details: string} = await req.json();
    // console.log(`Logging at ${NODE_ENV} :`, {user, details});
    await connectToDB();

    const log = await Log.create({
        user,
        details
    });
    

    return NextResponse.json({ message: "Log recorded" }, {status: 201});
  } catch (error) {
    console.error("Logging error:", error);
    return NextResponse.json({ error: "Failed to log data" }, { status: 500 });
  }
}
