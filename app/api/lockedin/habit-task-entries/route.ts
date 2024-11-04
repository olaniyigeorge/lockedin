import HabitTaskEntry from "@/models/lockedin.task-entry"; // Import the model
import { connectToDB } from "@/utils/database";

export async function POST(request: Request) {
    try {
        const { habit, completed, date } = await request.json();
        await connectToDB();

        // Normalize the date to midnight for the uniqueness constraint
        const entryDate = new Date(date);
        entryDate.setHours(0, 0, 0, 0); // Set time to midnight

        // Check for existing entry
        const existingEntry = await HabitTaskEntry.findOne({
            habit,
            date: entryDate
        });

        if (existingEntry) {
            console.log("Entry exists: ", existingEntry)
            return new Response("An entry for today already exists", { status: 409 }); // Conflict status
        }

        // Create a new HabitTaskEntry
        const newEntry = await HabitTaskEntry.create({
            habit,
            completed,
            date: entryDate,
        });

        return new Response(JSON.stringify(newEntry), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to create habit task entry", { status: 500 });
    }
}
