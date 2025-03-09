import HabitTask from "@/models/habit-task";
import HabitTaskEntry from "@/models/task-entry";
import { connectToDB } from "@/services/db_mongo";

import { NextRequest, NextResponse } from "next/server";
import { getSessionData } from "@/utils/helpers";
import { GetHabitTasksResponse, HabitTaskFilter, PostHabitTaskRequest, PostHabitTaskResponse } from "./docs";


export async function GET(request: NextRequest): Promise<NextResponse<GetHabitTasksResponse>> {
    const sessionData = await getSessionData(request);
    console.log("\n", sessionData, "\n");

    try {
        const url = new URL(request.url);
        await connectToDB();

        // Build the filter object dynamically
        const filter: HabitTaskFilter = {};

        const owner = url.searchParams.get("owner");
        const goal = url.searchParams.get("goal");
        const aspect = url.searchParams.get("aspect");
        const accessibility = url.searchParams.get("accessibility") as "public" | "private" | "partnership";
        const isActive = url.searchParams.get("isActive");
        const startDate = url.searchParams.get("start_date");
        const endDate = url.searchParams.get("end_date");

        // Pagination parameters
        const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "10", 10), 100); // Max limit = 100
        const skip = (page - 1) * limit;

        // Apply filtering conditions
        if (owner) {
            if (owner !== sessionData?.user.id) {
                return NextResponse.json(
                    {
                        message: "You are not authorized to view these habit tasks",
                        data: [],
                        pagination: { totalHabitTasks: 0, totalPages: 0, currentPage: page, limit },
                    },
                    { status: 401 }
                );
            }
            filter.owner = owner;
        }

        if (goal) filter.goal = goal;
        if (aspect) filter.aspect = aspect;
        if (accessibility) filter.accessibility = accessibility;
        if (isActive !== null) filter.isActive = isActive === "true";

        // Apply date filtering
        if (startDate) filter.start_date = { $gte: new Date(startDate) };
        if (endDate) filter.end_date = { $lte: new Date(endDate) };

        console.log("Fetching habit tasks with filters: ", filter);

        // Fetch total count for pagination
        const totalHabitTasks = await HabitTask.countDocuments(filter);
        const totalPages = Math.ceil(totalHabitTasks / limit);

        // Fetch paginated habit tasks
        const habitTasks = await HabitTask.find(filter).skip(skip).limit(limit);

        // Fetch entries for the habit tasks using their IDs
        const habitTaskIds = habitTasks.map((task) => task._id);
        const entries = await HabitTaskEntry.find({ habit: { $in: habitTaskIds } });

        // Create a mapping of entries for easier access
        const entriesMap: Record<string, any[]> = entries.reduce((acc, entry) => {
            if (!acc[entry.habit]) {
                acc[entry.habit] = [];
            }
            acc[entry.habit].push(entry);
            return acc;
        }, {});

        // Combine the tasks with their respective entries
        const habitTasksWithEntries = habitTasks.map((task) => ({
            ...task.toObject(),
            entries: entriesMap[task._id] || [],
        }));

        return NextResponse.json(
            {
                message: "Habit tasks (& entries) fetched successfully",
                data: habitTasksWithEntries,
                pagination: { totalHabitTasks, totalPages, currentPage: page, limit },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch habit tasks" },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest): Promise<NextResponse<PostHabitTaskResponse | { message: string }>> {
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
  
      console.log("Saving... ", newHabitTask);
      await newHabitTask.save();
  
      return NextResponse.json({ message: "Habit task created successfully", data: newHabitTask }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to create habit task" }, { status: 500 });
    }
  }