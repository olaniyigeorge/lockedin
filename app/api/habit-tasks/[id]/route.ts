import { getSessionData } from "@/utils/helpers";
import HabitTask from "@/models/habit-task";
import HabitTaskEntry from "@/models/task-entry";
import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    const sessionData = await getSessionData(request);
    const url  = new URL(request.url);
    const id = url.pathname.split('/').pop();


    try {
        await connectToDB();

        if (id) {
            console.log(`Getting this habit task... ${id}\n`);

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

        return NextResponse.json(
            {
                message: "No ID provided"
            },
            {
                status: 400
            }
        );
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domain", { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const sessionData = await getSessionData(request);
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();


    const { 
        title, 
        description, 
        aspect, 
        accessibility, 
        frequency,
        interval,
        isActive,
        start_date, 
        end_date 
    } = await request.json();

    try {

        if (id) {
            console.log("Getting this habit task")
            await connectToDB();
            const habit_task = await HabitTask.findById(id); 
            
            if (!habit_task) {
                return new Response("Habit task not found", { status: 404 });
            }
            if (habit_task.owner != sessionData?.user.id) {
                return NextResponse.json( 
                    {
                        "message": "You are not authorised to update this habit task"
                    },
                    {status: 401}
                )
            }

            // Update the habit task data
            habit_task.title = title;
            habit_task.description = description;
            habit_task.aspect = aspect;
            habit_task.accessibility = accessibility;
            habit_task.interval = interval,
            habit_task.frequency =  frequency,
            habit_task.isActive = isActive
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


export async function DELETE(request: NextRequest) {
    const sessionData = await getSessionData(request)
    const url  = new URL(request.url);
    const id = url.pathname.split('/').pop();
    

    try {
        if (id) {
            await connectToDB();
            const habit_task = await HabitTask.findById(id); 
            
            if (!habit_task) {
                return NextResponse.json({"message":"Habit task not found"}, { status: 404 });
            }

            if (habit_task.owner != sessionData?.user.id) {
                return NextResponse.json( 
                    {
                        "message": "You are not authorised to delete this habit task"
                    },
                    {status: 401}
                )
            }
            
            await HabitTask.findByIdAndDelete(id)
            return new NextResponse(null, { status: 204 } // {"message":"Habit task deleted successfully"}
            );
        }

        
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {"message": "Error deleting habit task"}, 
            { status: 500 }
        );
    }
};
