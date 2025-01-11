// import HabitTaskEntry from "@/models/lockedin.task-entry"; // Import the model
// import { connectToDB } from "@/utils/db.service.mongo";


// export async function POST(request: Request) {
//     try {
//         const { habit, completed, date } = await request.json();
//         await connectToDB();

//         // Normalize the date to midnight for the uniqueness constraint
//         const entryDate = new Date(date);
//         entryDate.setHours(0, 0, 0, 0); // Set time to midnight

//         // Check for existing entry
//         const existingEntry = await HabitTaskEntry.findOne({
//             habit,
//             date: entryDate
//         });

//         if (existingEntry) {
//             console.log("Entry exists: ", existingEntry)
//             return new Response("An entry for today already exists", { status: 409 }); // Conflict status
//         }

//         // Create a new HabitTaskEntry
//         const newEntry = await HabitTaskEntry.create({
//             habit,
//             completed,
//             date: entryDate,
//         });

//         return new Response(JSON.stringify(newEntry), { status: 201 });
//     } catch (error) {
//         console.error(error);
//         return new Response("Failed to create habit task entry", { status: 500 });
//     }
// }



import LifeDomain from "@/models/lockedin.life-domain";
import { connectToDB } from "@/services/db_mongo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {
       // Parse the URL to get query parameters
        const url = new URL(request.url);
        const filter : 'owner' | 'id' | null = null
        const owner = url.searchParams.get("owner");
        const id = url.searchParams.get("id"); 

        if (owner) {
            console.log("Getting life domains from this user")
            await connectToDB();
            const my_life_domains = await LifeDomain.find({ owner: owner }); // Use the extracted ID

            return NextResponse.json(
                {
                    message: "success",
                    my_life_domains
                },
                {
                    status: 200
                }
            )
        }

        return NextResponse.json(
            "No filter param", 
            { status: 400}
        ) 
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domains created by user", { status: 500 });
    }
}