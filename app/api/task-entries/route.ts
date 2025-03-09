import { connectToDB } from "@/services/db_mongo";
import HabitTaskEntry from "@/models/task-entry";
import { NextRequest, NextResponse } from "next/server";
import { CreateHabitTaskEntryInput, CreateHabitTaskEntryResponse, GetHabitTaskEntriesInput, GetHabitTaskEntriesResponse, iHabitTaskEntry } from "./docs";

// POST - Create new HabitTask Entry
export async function POST(request: NextRequest): Promise<NextResponse<CreateHabitTaskEntryResponse | { message: string }>> {
  try {
    const body: CreateHabitTaskEntryInput = await request.json();
    const { owner, habit, habit_challenge, note, proof_link, date } = body;

    await connectToDB();

    const entryDate = new Date(date);

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const existingEntry = await HabitTaskEntry.findOne({
            habit,
            date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingEntry) {
      return NextResponse.json({ message: "An entry for this habit on the selected date already exists." }, { status: 409 });
    }

    const newEntry = await HabitTaskEntry.create({
      owner,
      habit,
      habit_challenge,
      note,
      proof_link,
      date: entryDate,
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create habit task entry" }, { status: 500 });
  }
}

// GET - Filter HabitTask Entries
export async function GET(request: NextRequest): Promise<NextResponse<GetHabitTaskEntriesResponse | { message: string }>> {
    try {
      const { searchParams } = new URL(request.url);
  
      // Parse filters
      const filters: GetHabitTaskEntriesInput = {
        owner: searchParams.get("owner") || undefined,
        habit: searchParams.get("habit") || undefined,
        status: searchParams.get("status") as "logged" | "in-review" | "completed" || undefined,
        startDate: searchParams.get("startDate") || undefined,
        endDate: searchParams.get("endDate") || undefined,
      };
  
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const skip = (page - 1) * limit;
  
      await connectToDB();
  
      const query: any = {};
      if (filters.owner) query.owner = filters.owner;
      if (filters.habit) query.habit = filters.habit;
      if (filters.status) query.status = filters.status;
  
      if (filters.startDate || filters.endDate) {
        query.date = {};
        if (filters.startDate) query.date.$gte = new Date(filters.startDate);
        if (filters.endDate) query.date.$lte = new Date(filters.endDate);
      }
  
      const total = await HabitTaskEntry.countDocuments(query);
  
      const entries = await HabitTaskEntry.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
  
      const parsedEntries: iHabitTaskEntry[] = entries.map((entry) => ({
        _id: entry._id.toString(),
        owner: entry.owner?.toString(),
        habit_challenge: entry.habit_challenge?.toString(),
        habit: entry.habit?.toString(),
        date: entry.date.toISOString(),
        note: entry.note,
        status: entry.status,
        proof_link: entry.proof_link,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
      }));
  
      return NextResponse.json(
        {
          message: "Success",
          data: parsedEntries,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch habit task entries" }, { status: 500 });
    }
}