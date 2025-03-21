import HabitTaskEntry from "@/models/task-entry";
import { connectToDB } from "@/services/db_mongo";

export async function fetchHabitTaskEntriesFromDB({
    owner,
    habit,
    status,
    startDate,
    endDate,
    page = 1,
    limit = 10,
}: {
    owner?: string;
    habit?: string;
    status?: "logged" | "in-review" | "completed";
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}) {
    await connectToDB();

    const filter: any = {};

    // Apply filters
    if (owner) filter.owner = owner;
    if (habit) filter.habit = habit;
    if (status) filter.status = status;

    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    const totalEntries = await HabitTaskEntry.countDocuments(filter);
    const totalPages = Math.ceil(totalEntries / limit);

    const entries = await HabitTaskEntry.find(filter)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const parsedEntries = entries.map((entry) => ({
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

    return {
        habitTaskEntries: parsedEntries,
        pagination: {
            totalEntries,
            totalPages,
            currentPage: page,
            limit,
        },
    };
}
