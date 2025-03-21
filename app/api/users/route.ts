import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSessionData } from "@/lib/helpers";
import { CreateUserPayload, CreateUserResponse, GetUsersResponse } from "./docs";




export async function POST(req: NextRequest): Promise<NextResponse<CreateUserResponse>>  {
    const { 
        username, 
        email, 
        password, 
        first_name = "", 
        last_name = "", 
        country, 
        role,
        image = "",
        phone_number
    }: CreateUserPayload = await req.json();

    try {
        if (!password || !email) {
            return NextResponse.json(
                { error: "Both email and password are required." },
                { status: 400 }
            );
        }

        const hashedPass = await bcrypt.hash(password, 10);
        await connectToDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (passwordMatch) {
                
                return NextResponse.json(
                    { 
                        message: "Successfully signed in", 
                        user: existingUser },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    {
                        error: "Provide the correct password to this account.",
                    }, {status: 400}
                )
            }
        }

        const newUser = await User.create({
            email: email,
            username: username || email.split("@")[0],
            first_name: first_name, 
            last_name: last_name, 
            country: country, 
            phone_number: phone_number, 
            isVerified: false, 
            role: role,
            password: hashedPass, 
            image: image,
        });

        return NextResponse.json(
            {
                message: "Successfully signed up",
                user: newUser
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: `${error}`},
            { status: 500 }
        );
    }
}



export async function GET(req: NextRequest): Promise<NextResponse<GetUsersResponse>> {
    const sessionData = await getSessionData(req);
    if (sessionData?.user.email !== "abelejeolaniyi@gmail.com") { // sessionData?.user.role !== "admin"
        return NextResponse.json(
            {error: "You are not authorized to view users"},
            {status: 401}
        )
    }
    try {
    await connectToDB();
    const url = new URL(req.url);

    // Query parameters for filtering & search
    const search = url.searchParams.get("search") || "";
    const role = url.searchParams.get("role");
    const country = url.searchParams.get("country");
    const firstLetter = url.searchParams.get("firstLetter");

    // Build search query
    const query: Record<string, any> = {};

    if (search) {
        query.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { phone_number: { $regex: search, $options: "i" } },
        ];
    }

    if (role) {
        query.role = role;
    }

    if (country) {
        query.country = country;
    }

    if (firstLetter) {
        query.first_name = { $regex: `^${firstLetter}`, $options: "i" };
    }

    // Fetch users
    const users = await User.find(query);

    return NextResponse.json({ message: "Users fetched successfully", users }, { status: 200 });

    } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }
}



