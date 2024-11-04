import { connectToDB } from "@/utils/database";
import HabitTask from "@/models/lockedin.habit-task";

export const POST = async (req: Request) => {
    const { owner, title, description, aspect, accessibility, start_date, end_date } = await req.json();
    
    try {
        console.log("Connecting to db");
        await connectToDB();

        console.log("Constructing Habit Task: ", {
            owner: owner,
            title: title,
            description: description,
            aspect: aspect,
            accessibility: accessibility || "private",
            start_date: start_date || new Date(),
            end_date: end_date || new Date(new Date().setDate(new Date().getDate() + 21)),
        });
        const newHabitTask = new HabitTask({
            owner: owner,
            title: title, // Make sure to include the title here
            description: description,
            aspect: aspect, // Add aspect if it's required
            accessibility: accessibility || "private", // Default to "private" if not provided
            start_date: start_date || new Date(), // Default to now if not provided
            end_date: end_date || new Date(new Date().setDate(new Date().getDate() + 21)), // Default to 21 days in the future if not provided
        });

        console.log("Saving habit task");
        await newHabitTask.save();

        console.log(newHabitTask);

        return new Response(JSON.stringify(newHabitTask), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create habit task", { status: 500 });
    }
}