import { getSessionData } from "@/utils/helpers";
import HabitTask from "@/models/habit-task";
import HabitTaskEntry from "@/models/task-entry";
import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import { NextRequest, NextResponse } from "next/server";
import {
  HabitTaskWithEntries,
  iGetHabitTaskResponse,
  // iHabitTaskEntry,
  iUpdateHabitTaskResponse,
  UpdateHabitTaskPayload,
} from "./docs";

/**
 * GET /api/habit-tasks/[id]
 * Fetch a specific habit task and its associated entries.
 * @param request NextRequest
 * @returns HabitTask with populated entries or error message
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<iGetHabitTaskResponse>> {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      {
        message: "No ID provided",
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const habitTaskDoc = await HabitTask.findById(id).populate({
      path: "owner",
      select: "_id email username first_name last_name",
      model: User,
    });

    if (!habitTaskDoc) {
      return NextResponse.json(
        {
          message: "Habit task not found",
          data: null,
        },
        { status: 404 }
      );
    }

    const entriesDocs = await HabitTaskEntry.find({ habit: id });

    // Explicitly parse needed fields
    const habitTask: HabitTaskWithEntries = {
      _id: habitTaskDoc._id.toString(),
      title: habitTaskDoc.title,
      description: habitTaskDoc.description,
      aspect: habitTaskDoc.aspect,
      accessibility: habitTaskDoc.accessibility,
      frequency: habitTaskDoc.frequency,
      interval: habitTaskDoc.interval,
      isActive: habitTaskDoc.isActive,
      start_date: habitTaskDoc.start_date?.toISOString(),
      end_date: habitTaskDoc.end_date?.toISOString(),
      createdAt: habitTaskDoc.createdAt?.toISOString(),
      updatedAt: habitTaskDoc.updatedAt?.toISOString(),
      owner: habitTaskDoc.owner, // Already populated and typed
      entries: entriesDocs.map((entry) => ({
        _id: entry._id.toString(),
        habit: entry.habit.toString(),
        date: entry.date?.toISOString(),
        note: entry.note,
        value: entry.value,
        createdAt: entry.createdAt?.toISOString(),
        updatedAt: entry.updatedAt?.toISOString(),
      })),
    };

    return NextResponse.json(
      {
        message: "Success",
        data: habitTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: `${error}`,
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/habit-tasks/[id]
 * Update a specific habit task. Only the owner can update it.
 * @param request NextRequest
 * @returns Success or error message
 */
export async function PATCH(
  request: NextRequest
): Promise<NextResponse<iUpdateHabitTaskResponse>> {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      {
        message: "No ID provided",
      },
      { status: 400 }
    );
  }

  try {
    const sessionData = await getSessionData(request);
    const payload: UpdateHabitTaskPayload = await request.json();

    await connectToDB();

    const habitTask = await HabitTask.findById(id);

    if (!habitTask) {
      return NextResponse.json(
        { message: "Habit task not found" },
        { status: 404 }
      );
    }

    if (habitTask.owner.toString() !== sessionData?.user?.id) {
      return NextResponse.json(
        { message: "You are not authorised to update this habit task" },
        { status: 401 }
      );
    }

    // Update only provided fields
    Object.assign(habitTask, payload);

    await habitTask.save();

    return NextResponse.json(
      { message: "Successfully updated habit task" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: `${error}`,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/habit-tasks/[id]
 * Delete a specific habit task. Only the owner can delete it.
 * @param request NextRequest
 * @returns Success or error response
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ message: "No ID provided" }, { status: 400 });
  }

  try {
    const sessionData = await getSessionData(request);

    await connectToDB();

    const habitTask = await HabitTask.findById(id);

    if (!habitTask) {
      return NextResponse.json(
        { message: "Habit task not found" },
        { status: 404 }
      );
    }

    if (habitTask.owner.toString() !== sessionData?.user?.id) {
      return NextResponse.json(
        { message: "You are not authorised to delete this habit task" },
        { status: 403 }
      );
    }

    await HabitTask.findByIdAndDelete(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `${error}` },
      { status: 500 }
    );
  }
}
