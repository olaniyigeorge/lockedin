import HabitTask from "@/models/habit-task";
import HabitTaskEntry from "@/models/task-entry";
import { connectToDB } from "@/services/db_mongo";

export async function fetchHabitTasksFromDB({
    owner,
    sessionData,
    goal,
    aspect,
    accessibility,
    isActive,
    startDate,
    endDate,
    page = 1,
    limit = 10,
}: {
    owner?: string;
    sessionData?: any;
    goal?: string;
    aspect?: string;
    accessibility?: "public" | "private" | "partnership";
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}) {
    await connectToDB();

    const filter: any = {};

    // Role-based filtering logic
    if (!sessionData) {
        filter.accessibility = "public";
    } else if (sessionData?.user.role === "admin") {
        // Admin: no restrictions
    } else {
        filter.$or = [
            { accessibility: "public" },
            { owner: sessionData.user.id },
        ];
    }

    // Apply additional filtering
    if (owner) filter.owner = owner;
    if (goal) filter.goal = goal;
    if (aspect) filter.aspect = aspect;
    if (accessibility) filter.accessibility = accessibility;
    if (typeof isActive === "boolean") filter.isActive = isActive;

    if (startDate || endDate) {
        filter.$and = [];
        if (startDate) filter.$and.push({ start_date: { $gte: new Date(startDate) } });
        if (endDate) filter.$and.push({ end_date: { $lte: new Date(endDate) } });
    }


    console.log(`Filters: ${JSON.stringify(filter)}`);
    

    const totalHabitTasks = await HabitTask.countDocuments(filter);
    const totalPages = Math.ceil(totalHabitTasks / limit);
    const habitTasks = await HabitTask.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

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

    return {
        habitTasks: habitTasksWithEntries,
        pagination: {
            totalHabitTasks,
            totalPages,
            currentPage: page,
            limit,
        },
    };
}
