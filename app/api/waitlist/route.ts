// import Waitlist from "@/models/lockedin.waitlist";
// import { connectToDB } from "@/utils/db.service.mongo";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { full_name, email, discovery_location } = await req.json();

//     if (!full_name || !email) {
//       return NextResponse.json(
//         { error: "Both full_name and email_address are required." },
//         { status: 400 }
//       );
//     }

//     await connectToDB();


//     // Check for existing entry with email
//     const existingEntry = await Waitlist.findOne({
//         email,
//     });

//     if (existingEntry) {
//         console.log("Already joined: ", existingEntry)
//         return new Response("A waitlist entry with this email already exists", { status: 200 });
//     }

//     // Create a new Waitlist
//     const newEntry = await Waitlist.create({
//         full_name,
//         email,
//         discovery_location
//     });

//     return NextResponse.json(
//       {
//         message: "Successfully added to the waitlist!",
//         ...newEntry
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to process the request." },
//       { status: 500 }
//     );
//   }
// }


// // export async function GET(req: NextRequest) {
// //   return NextResponse.json(
// //     { message: "this is a get request" },
// //     { status: 200 }
// //   );
// // }

// // export async function POST(req: NextRequest) {
// //   return NextResponse.json(
// //     { message: "This is a post request" },
// //     { status: 200 }
// //   );
// // }

// // export async function PATCH(req: NextRequest) {
// //   return NextResponse.json(
// //     { message: "This is a patch request" },
// //     { status: 200 }
// //   );
// // }




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