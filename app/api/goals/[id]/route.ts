import Goal from "@/models/goal";
import HabitTask from "@/models/habit-task";
import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import { NextRequest, NextResponse} from "next/server";
import { ErrorResponse, GetGoalResponse, UpdateGoalPayload, UpdateGoalResponse } from "./docs";
import { getSessionData } from "@/utils/helpers";


/**
 * Fetch a goal by its ID.
 * @param request - The Next.js request object.
 * @returns The goal object with selected owner details.
 */
export async function GET(request: NextRequest): Promise<NextResponse<GetGoalResponse | { message: string }>> {
  try {
    
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();


    if (!id) {
      return NextResponse.json({ message: "Goal ID is required" }, { status: 400 });
    }

    await connectToDB();

    

    const goal = await Goal.findById(id).populate({
      path: "owner",
      select: "_id username role image",
      model: User,
    });

    if (!goal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    const tasks = await HabitTask.find({ goal: id });

    return NextResponse.json(
      {
        message: "Goal retrieved successfully",
        data: {
          _id: goal._id.toString(),
          owner: goal.owner,
          name: goal.name,
          description: goal.description,
          privacy: goal.privacy,
          targetDate: goal.targetDate.toISOString(),
          isAchieved: goal.isAchieved,
          createdAt: goal.createdAt.toISOString(),
          updatedAt: goal.updatedAt.toISOString(),
          tasks,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error while fetching goal" }, { status: 500 });
  }
}

/**
 * Update a goal by ID.
 * @param request - The Next.js request object.
 * @returns A success or error message.
 */
export async function PATCH(request: NextRequest): Promise<NextResponse<UpdateGoalResponse | { message: string }>> {
    const sessionData= await getSessionData(request);
    try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Goal ID is required" }, { status: 400 });
    }

    const { name, description, privacy, targetDate, isAchieved }: UpdateGoalPayload = await request.json();

    await connectToDB();
    const goal = await Goal.findById(id);

    if (!goal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }
    if (sessionData?.user.id !== goal.owner && sessionData?.user.role !== 'admin') {
        return NextResponse.json(
            {message: "You are not authorised someone else's goal"},
            {status: 401}
        )
    }

    if (name) goal.name = name;
    if (description) goal.description = description;
    if (privacy) goal.privacy = privacy;
    if (targetDate) goal.targetDate = new Date(targetDate);
    if (isAchieved !== undefined) goal.isAchieved = isAchieved;

    await goal.save();

    return NextResponse.json({ message: "Successfully updated goal" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update goal" }, { status: 500 });
  }
}

/**
 * Delete a goal by ID.
 * @param request - The Next.js request object.
 * @returns A success or error message.
 */
export async function DELETE(request: NextRequest): Promise<NextResponse<null | { message: string } | ErrorResponse>> {
    const sessionData = await getSessionData(request);
  
    try {
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();
  
      if (!id) {
        return NextResponse.json({ message: "Goal ID is required" }, { status: 400 });
      }
  
      await connectToDB();
  
      // Fetch goal
      const goal = await Goal.findById(id);
      if (!goal) {
        return NextResponse.json({ message: "Goal not found" }, { status: 404 });
      }
  
      // Check if the user is the owner or an admin
      if (sessionData?.user.id !== goal.owner.toString() && sessionData?.user.role !== "admin") {
        return NextResponse.json(
          { message: "You are not authorised to delete this goal" },
          { status: 403 }
        );
      }
  
      await Goal.findByIdAndDelete(id);
  
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error deleting goal" }, { status: 500 });
    }
  }
  