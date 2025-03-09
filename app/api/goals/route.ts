import { connectToDB } from "@/services/db_mongo";
import Goal from "@/models/goal";
import { NextRequest, NextResponse } from "next/server";
import { CreateGoalResponse, CreateGoalPayload, GetGoalsResponse } from "./docs";

export async function POST(request: NextRequest): Promise<NextResponse<CreateGoalResponse>> {
  try {
    const { owner, name, description, privacy, isAchieved, targetDate }: CreateGoalPayload = 
      await request.json();

    if (!owner || !name || !targetDate) {
      return NextResponse.json(
        { message: "Owner, name, and targetDate are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    const newGoal = new Goal({
      owner,
      name,
      description,
      privacy,
      isAchieved,
      targetDate,
    });

    await newGoal.save();

    return NextResponse.json(
      { 
        message: "Goal created successfully", 
        data: newGoal 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create goal", error },
      { status: 500 }
    );
  }
}


export async function GET(request: NextRequest): Promise<NextResponse<GetGoalsResponse>> {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const owner = url.searchParams.get("owner");
    const privacy = url.searchParams.get("privacy") as "public" | "private" | null;
    const isAchieved = url.searchParams.get("isAchieved") === "true";
    const targetDate = url.searchParams.get("targetDate");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    // Pagination parameters
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100); // Max limit = 100

    let filters: any = {};

    if (owner) filters.owner = owner;
    if (privacy) filters.privacy = privacy;
    if (url.searchParams.has("isAchieved")) filters.isAchieved = isAchieved;
    if (targetDate) filters.targetDate = new Date(targetDate);

    // Handle date range filtering
    if (startDate && endDate) {
      filters.targetDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Fetch goals with pagination
    const totalGoals = await Goal.countDocuments(filters);
    const totalPages = Math.ceil(totalGoals / limit);

    const goals = await Goal.find(filters)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      { 
        message: "Goals fetched successfully", 
        data: goals,
        pagination: { totalGoals, totalPages, currentPage: page, limit }
     },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch goals", error },
      { status: 500 }
    );
  }
}
