import HabitTask from "@/models/habit-task";
import HabitTaskEntry from "@/models/task-entry";
import { connectToDB } from "@/services/db_mongo";

import { NextRequest, NextResponse } from "next/server";
import { getSessionData } from "@/utils/helpers";
import { GetHabitTasksResponse, HabitTaskFilter, PostHabitTaskRequest, PostHabitTaskResponse } from "./docs";


export async function GET(request: NextRequest): Promise<NextResponse<GetHabitTasksResponse>> {
    const sessionData = await getSessionData(request);
  
    try {
      const url = new URL(request.url);
      await connectToDB();
  
      const filter: HabitTaskFilter = {};
  
      // Optional filters
      const goal = url.searchParams.get("goal");
      const aspect = url.searchParams.get("aspect");
      const accessibility = url.searchParams.get("accessibility") as "public" | "private" | "partnership";
      const isActive = url.searchParams.get("isActive");
      const startDate = url.searchParams.get("start_date");
      const endDate = url.searchParams.get("end_date");
  
      // Pagination
      const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100);
      const skip = (page - 1) * limit;
  
      // Role-based filtering logic
      if (!sessionData) {
        // Unauthenticated: show only public tasks
        filter.accessibility = "public";
      } else if (sessionData?.user.role === "admin") {
        // Admin: no restrictions
      } else {
        // Authenticated non-admin user: public + owned tasks
        filter.$or = [
          { accessibility: "public" },
          { owner: sessionData.user.id }, // includes private and partnership by user
        ];
      }
  
      // Apply additional filtering
      if (goal) filter.goal = goal;
      if (aspect) filter.aspect = aspect;
      if (accessibility) filter.accessibility = accessibility;
      if (isActive !== null) filter.isActive = isActive === "true";
  
      if (startDate || endDate) {
        filter.$and = [];
        if (startDate) filter.$and.push({ start_date: { $gte: new Date(startDate) } });
        if (endDate) filter.$and.push({ end_date: { $lte: new Date(endDate) } });
      }
  
      console.log("Habit Task Filters: ", filter);
  
      // Get count & paginated results
      const totalHabitTasks = await HabitTask.countDocuments(filter);
      const totalPages = Math.ceil(totalHabitTasks / limit);
      const habitTasks = await HabitTask.find(filter).skip(skip).limit(limit);
  
      // Get related entries
      const habitTaskIds = habitTasks.map((task) => task._id);
      const entries = await HabitTaskEntry.find({ habit: { $in: habitTaskIds } });
  
      const entriesMap: Record<string, any[]> = entries.reduce((acc, entry) => {
        const habitId = entry.habit.toString();
        if (!acc[habitId]) acc[habitId] = [];
        acc[habitId].push(entry);
        return acc;
      }, {});
  
      const habitTasksWithEntries = habitTasks.map((task) => ({
        ...task.toObject(),
        entries: entriesMap[task._id.toString()] || [],
      }));
  
      return NextResponse.json(
        {
          message: "Habit tasks (with entries) fetched successfully",
          data: habitTasksWithEntries,
          pagination: {
            totalHabitTasks,
            totalPages,
            currentPage: page,
            limit,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: `${error}` },
        { status: 500 }
      );
    }
  }
  
export async function POST(request: NextRequest): Promise<NextResponse<PostHabitTaskResponse | { error: string }>> {
    const sessionData = await getSessionData(request);
    try {
      const {
        owner,
        goal,
        aspect,
        title,
        description,
        accessibility,
        interval,
        frequency,
        isActive,
        start_date,
        end_date,
      }: PostHabitTaskRequest = await request.json();
      if (sessionData?.user.id !== owner){
        return NextResponse.json(
            {
                message: "You are not authorised to create this habit task. Please sign in",
                data: null
            }, 
            {status: 401}
        )
      }
  
      await connectToDB();
  
      const newHabitTask = new HabitTask({
        owner,
        goal,
        aspect,
        title,
        description,
        accessibility,
        interval,
        frequency,
        isActive,
        start_date,
        end_date,
      });
  
      await newHabitTask.save();
  
      return NextResponse.json(
        { 
            message: "Habit task created successfully", 
            data: newHabitTask 
        }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: `${error}`}, { status: 500 });
    }
  }