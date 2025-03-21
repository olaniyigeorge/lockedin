import HabitTaskEntry from "@/models/task-entry";
import { connectToDB } from "@/services/db_mongo";
import { getSessionData } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { eHabitTaskEntry } from "./docs";

/**
 * @route GET /api/task-entries/[id]
 * @description Fetch a single habit task entry by ID.
 * @param {string} id - Task Entry ID from URL.
 * @returns {NextResponse<{ message: string; data: iHabitTaskEntry | null }>} - Returns habit task entry.
 */
export async function GET(request: NextRequest): Promise<NextResponse<{ error?: string; message?: string; data: eHabitTaskEntry | null }>> {
    try {
      await connectToDB();
  
      const url = new URL(request.url);
      const id = url.pathname.split("/").pop();
  
      if (!id) {
        return NextResponse.json({ message: "Task Entry ID is required", data: null }, { status: 400 });
      }
  
      const entry = await HabitTaskEntry.findById(id)
        .populate({
          path: "owner",
          model: User,
          select: "_id username email first_name last_name",
        });
  
      if (!entry) {
        return NextResponse.json({ message: "Task Entry not found", data: null }, { status: 404 });
      }
  
      const owner = entry.owner as {
        _id: string;
        username: string;
        email: string;
        first_name?: string;
        last_name?: string;
      };
  
      const parsedEntry: eHabitTaskEntry = {
        _id: entry._id.toString(),
        owner: {
          _id: owner._id.toString(),
          username: owner.username,
          email: owner.email,
          first_name: owner.first_name || "",
          last_name: owner.last_name || "",
        },
        habit_challenge: entry.habit_challenge?.toString(),
        habit: entry.habit.toString(),
        date: entry.date.toISOString(),
        note: entry.note,
        status: entry.status,
        proof_link: entry.proof_link,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
      };
  
      return NextResponse.json({ message: "Success", data: parsedEntry }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to fetch task entry", data: null }, { status: 500 });
    }
  }

/**
 * @route PATCH /api/task-entries/[id]
 * @description Update a habit task entry.
 * @param {string} id - Task Entry ID from URL.
 * @body {Partial<iHabitTaskEntry>} - Fields to update.
 * @returns {NextResponse<{ message: string }>} - Success or error message.
 */
export async function PATCH(request: NextRequest): Promise<NextResponse<{ error?: string, message?: string }>> {
  const sessionData = await getSessionData(request);

  try {
    await connectToDB();
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) return NextResponse.json({ message: "Task Entry ID is required" }, { status: 400 });

    const entry = await HabitTaskEntry.findById(id);
    if (!entry) return NextResponse.json({ message: "Task Entry not found" }, { status: 404 });

    if (entry.owner.toString() !== sessionData?.user.id && sessionData?.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized to update this entry" }, { status: 401 });
    }

    const updates = await request.json();

    for (const key in updates) {
      if (updates[key] !== undefined && key in entry) {
        entry[key] = updates[key];
      }
    }

    await entry.save();

    return NextResponse.json({ message: "Task entry updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update task entry" }, { status: 500 });
  }
}

/**
 * @route DELETE /api/task-entries/[id]
 * @description Delete a habit task entry.
 * @param {string} id - Task Entry ID from URL.
 * @returns {NextResponse<{ message: string } | null>} - Success or error message.
 */
export async function DELETE(request: NextRequest): Promise<NextResponse<{ error?: string, message?: string } | null>> {
  const sessionData = await getSessionData(request);

  try {
    await connectToDB();
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) return NextResponse.json({ message: "Task Entry ID is required" }, { status: 400 });

    const entry = await HabitTaskEntry.findById(id);
    if (!entry) return NextResponse.json({ message: "Task Entry not found" }, { status: 404 });

    if (entry.owner.toString() !== sessionData?.user.id && sessionData?.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized to delete this entry" }, { status: 401 });
    }

    await HabitTaskEntry.findByIdAndDelete(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting task entry" }, { status: 500 });
  }
}
