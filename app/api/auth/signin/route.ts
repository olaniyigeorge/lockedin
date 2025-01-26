import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
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
            }
        }

        const newUser = await User.create({
            email: email,
            username: email.split("@")[0],
            password: hashedPass
        });

        return NextResponse.json(
            {
                message: "Successfully signed up",
                user: newUser
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {"error": error},
            { status: 500 }
        );
    }
}
