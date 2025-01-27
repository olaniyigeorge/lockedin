import HabitTask from "@/models/habit-task";
import HabitTaskEntry from "@/models/task-entry";
import { connectToDB } from "@/services/db_mongo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
        const url = new URL(request.url);
        const filter : 'owner' | 'id' | null = null
        const owner = url.searchParams.get("owner"); 
        const id = url.searchParams.get("id");

        if (owner) {
            console.log("Getting habit tasks from this user");
            await connectToDB();
        
            // Fetch habit tasks based on the filter
            const my_habit_tasks = await HabitTask.find({ owner: owner });
        
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
   

            return NextResponse.json(
                { 
                    message: "habit tasks fetched successfully",
                    data: habitTasksWithEntries
                },
                { status: 200 }
            );
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
        return new Response("Failed to fetch habit tasks created by user", { status: 500 });
    }
}


export async function PATCH(request: Request) {
    const { title, description, aspect, accessibility, start_date, end_date } = await request.json();

    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id"); 

        if (id) {
            console.log("Getting this habit task")
            await connectToDB();
            const habit_task = await HabitTask.findById(id); 
            
            if (!habit_task) {
                return new Response("Habit task not found", { status: 404 });
            }

            // Update the habit task data
            habit_task.title = title;
            habit_task.description = description;
            habit_task.aspect = aspect;
            habit_task.accessibility = accessibility;
            // habit_task.start_date = start_date;
            // habit_task.end_date = end_date;


            await habit_task.save()

            return new Response("Successfully updated life domain", { status: 200 })
        }

        return new Response("No filter param", { status: 400}) 
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domains created by user", { status: 500 });
    }
}



export async function DELETE(request: Request) {

    try {
        // Parse the URL to get query parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("id"); 
 
        if (id) {
            await connectToDB();
            // Find the habit task by ID and remove it
            await HabitTask.findByIdAndDelete(id)
            return new Response("Habit task deleted successfully", { status: 204 });
        }

        
    } catch (error) {
        console.log(error)
        return new Response("Error deleting prompt", { status: 500 });
    }
};


export async function POST(request: Request) {
    const { title, description, aspect, accessibility, owner, start_date, end_date } = await request.json();

    try {
        await connectToDB();

        // Create a new habit task
        const newHabitTask = new HabitTask({
            title,
            description,
            aspect,
            accessibility,
            owner,
            start_date,
            end_date,
        });

        // Save the new habit task to the database
        await newHabitTask.save();

        return NextResponse.json({
            message: "habit taks created successullly",
            data: newHabitTask
             },
             { status: 201 }
            );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Failed to create habit task",
                data: error
            },
            { status: 500 });
    }
}