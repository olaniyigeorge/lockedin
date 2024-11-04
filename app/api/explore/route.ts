import HabitTask from "@/models/lockedin.habit-task";
import HabitTaskEntry from "@/models/lockedin.task-entry";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {

    try {
       // Parse the URL to get query parameters
        const url = new URL(request.url);
        const accessibility = url.searchParams.get("accessibility"); // Extract the owner from query parameters
        const id = url.searchParams.get("id"); // Extract the owner from query parameters

        if (accessibility) {
            console.log("Getting public habit tasks ");
            await connectToDB();
        
            const my_habit_tasks = await HabitTask.find({ accessibility: "public" });
        
            // Fetch entries for the habit tasks using their IDs
            const habitTaskIds = my_habit_tasks.map(task => task._id);
            const entries = await HabitTaskEntry.find({ habit: { $in: habitTaskIds } });
        
            // Create a mapping of entries for easier access
            const entriesMap = entries.reduce((acc, entry) => {
                if (!acc[entry.habit]) {
                    acc[entry.habit] = [];
                }
                acc[entry.habit].push(entry);
                return acc;
            }, {});
        
            // Combine the tasks with their respective entries
            const habitTasksWithEntries = my_habit_tasks.map(task => ({
                ...task.toObject(), // Convert each Mongoose document to a plain object
                entries: entriesMap[task._id] || [], // Add entries for this task or an empty array if none
            }));
        
            return new Response(JSON.stringify(habitTasksWithEntries), { status: 200 });
        }
        

        if (id) {
            console.log("Getting this habit task");
            const habit_task = await HabitTask.findById(id); // Get the habit task by ID

            if (!habit_task) {
                return new Response("Habit task not found", { status: 404 });
            }

            // Fetch entries for the habit task
            const entries = await HabitTaskEntry.find({ habit: id }); // Fetch entries for the habit task
            
            // Create a plain object with the habit task details and entries
            const habitTaskWithEntries = {
                ...habit_task.toObject(), // Convert Mongoose document to plain object
                entries, // Add the entries array
            };

            return new Response(JSON.stringify(habitTaskWithEntries), { status: 200 });
        }

        return new Response("No filter param", { status: 400})

        
       
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch public habit tasks", { status: 500 });
    }
}
