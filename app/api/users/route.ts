// import LifeDomain from "@/models/lockedin.life-domain";
// import User from "@/models/user";
// import { connectToDB } from "@/utils/db.service.mongo";
// import { NextRequest, NextResponse } from "next/server";





// export async function GET(req: NextRequest) {

//     try {
//        // Parse the URL to get query parameters
//         const url = new URL(req.url);
//         const filter : 'owner' | 'id' | null = null
//         const owner = url.searchParams.get("owner");
//         const id = url.searchParams.get("id"); 

//         if (id) {
//             console.log("Getting this user")
//             await connectToDB();
//             const user = await User.findById({ _id: id });
//             return NextResponse.json(
//                 { message: "this user",
//                     user
//                  },
//                 { status: 200 }
//               );
//             }
     
//         return NextResponse.json(
//             "No filter param", 
//             { status: 400}
//         ) 
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//                 "Failed to get user", 
//                 { status: 500 }
//         );
//     }
// }




// export async function PATCH(request: Request) {
//     const { image, username } = await request.json();

//     try {
//        // Parse the URL to get query parameters
//         const url = new URL(request.url);
//         const id = url.searchParams.get("id"); 

//         if (id) {
//             console.log("Getting this user")
//             await connectToDB();
//             const user = await User.findById(id); 
            
//             if (!user) {
//                 return new Response("User not found", { status: 404 });
//             }

//             // Update the user data
//             user.image = image;
//             user.username = username;

//             await user.save()

//             return new Response("Successfully updated user", { status: 200 })
//         }

//         return new Response("No filter param", { status: 400}) 
//     } catch (error) {
//         console.error(error);
//         return new Response("Failed to update user", { status: 500 });
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