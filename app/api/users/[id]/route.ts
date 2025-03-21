import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import { getSessionData } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import { iGetUserResponse, UpdateUserPayload, UpdateUserResponse, DeleteUserResponse } from "./docs";

/**
 * @route GET /api/users/[id]
 * @description Fetch a single user by ID.
 * @param {string} id - User ID from URL.
 * @returns {NextResponse<iUser>} - Returns user details.
 */
export async function GET(request: NextRequest): Promise<NextResponse<iGetUserResponse>> {
    try {
        await connectToDB();
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ 
                message: "User ID is required",
                data: null
             }, { status: 400 });
        }
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                { 
                    message: "User not found",
                    data: null
                 }, { status: 404 });
        }

        return NextResponse.json(
            {
                message: "Successfully fetched user",
                data: user
            }, 
            { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch user" }, { status: 500 });
    }
}

/**
 * @route PATCH /api/users/[id]
 * @description Update user details.
 * @param {string} id - User ID from URL.
 * @body {UpdateUserPayload} - Fields to update.
 * @returns {NextResponse<UpdateUserResponse>} - Returns success or error message.
 */
export async function PATCH(request: NextRequest): Promise<NextResponse<UpdateUserResponse>> {
    const sessionData = await getSessionData(request);
    try {
        await connectToDB();
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        // Check is auth user is trying to update their own acc
        if (sessionData?.user.id  !== id  && sessionData?.user.role !== "admin") {
            return NextResponse.json(
                {message: "You are not authorised to update this account"},
                {status: 401}
            );
        }

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const { username, email, password, first_name, last_name, country, role, image, phone_number }: UpdateUserPayload = await request.json();

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        

        // Update only provided fields
        if (username) user.username = username;
        if (email) user.email = email;
        // if (password) user.password = password;
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (country) user.country = country;
        if (role) user.role = role;
        if (image) user.image = image;
        if (phone_number) user.phone_number = phone_number;

        await user.save();

        return NextResponse.json({ message: "Successfully updated user" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
    }
}

/**
 * @route DELETE /api/users/[id]
 * @description Delete a user by ID.
 * @param {string} id - User ID from URL.
 * @returns {NextResponse<DeleteUserResponse>} - Success or error message.
 */
export async function DELETE(request: NextRequest): Promise<NextResponse<DeleteUserResponse | null>> {
    const sessionData = await getSessionData(request);

    try {        
        console.log(`\n ${JSON.stringify(sessionData?.user)} \n`)
        if (sessionData?.user.role !== "admin") {
            return NextResponse.json({ message: "You are not authorized to delete users" }, { status: 401 });
        }

        await connectToDB();
        const url = new URL(request.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user._id.toString() !== sessionData?.user.id && sessionData.user.role !== "admin") {
            return NextResponse.json({ message: "You are not authorized to delete this user" }, { status: 403 });
        }

        await User.findByIdAndDelete(id);

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
    }
}
