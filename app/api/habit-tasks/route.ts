import HabitTask from "@/models/habit-task";
import HabitTaskEntry from "@/models/task-entry";
import { connectToDB } from "@/services/db_mongo";
import User from "@/models/user"; // Import the User model

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const owner = url.searchParams.get("owner");
        const id = url.searchParams.get("id");
        const accessibility = url.searchParams.get("accessibility");

        await connectToDB();

        if (owner) {
            console.log("Getting habit tasks from user... \n");
            
            // Build the filter object & fetch HTs based on filter
            const filter: { owner: string; accessibility?: string } = { owner: owner };
            if (accessibility) {
                filter.accessibility = accessibility;
            }
            const my_habit_tasks = await HabitTask.find(filter);

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
                ...task.toObject(),
                entries: entriesMap[task._id] || [],
            }));

            return NextResponse.json(
                {
                    message: "Habit tasks(& entries) fetched successfully",
                    data: habitTasksWithEntries
                },
                { status: 200 }
            );
        }

        if (id) {
            console.log("Getting this habit task... \n");

            const habit_task = await HabitTask.findById(id).populate({ path: "owner", select: "-password", model: User });
            if (!habit_task) {
                return new Response("Habit task not found", { status: 404 });
            }

            // Fetch entries for the habit task
            const entries = await HabitTaskEntry.find({ habit: id });

            // Create a plain object with the habit task details and entries
            const habitTaskWithEntries = {
                ...habit_task.toObject(), 
                entries, 
            };
            return new Response(
                            JSON.stringify(habitTaskWithEntries), 
                            { status: 200 }
            );
        }

        if (accessibility) {
            console.log("Getting all public habit tasks... \n"); // TODO take pagination params

            const public_habit_tasks = await HabitTask.find({ accessibility: accessibility });

            // Fetch entries for the public habit tasks using their IDs
            const habitTaskIds = public_habit_tasks.map(task => task._id);
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
            const habitTasksWithEntries = public_habit_tasks.map(task => ({
            ...task.toObject(), 
            entries: entriesMap[task._id] || [], 
            }));

            return NextResponse.json(
            {
                message: "Public habit tasks fetched successfully",
                data: habitTasksWithEntries
            },
            { status: 200 }
            );
        }

        return new Response("No filter param", { status: 400 });

    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch habit tasks", { status: 500 });
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

            return new Response("Successfully updated habit task", { status: 200 })
        }

        return new Response("No filter param", { status: 400}) 
    } catch (error) {
        console.error(error);
        return new Response("Error updating habit task", { status: 500 });
    }
}

export async function DELETE(request: Request) {

    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id"); 
 
        if (id) {
            await connectToDB();
            
            await HabitTask.findByIdAndDelete(id)
            return new Response("Habit task deleted successfully", { status: 204 });
        }

        
    } catch (error) {
        console.log(error)
        return new Response("Error deleting habit task", { status: 500 });
    }
};

export async function POST(request: Request) {
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
        end_date 
    } = await request.json();

    try {
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
            end_date 
        });

        await newHabitTask.save();

        return NextResponse.json({
            message: "Habit task created successullly",
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