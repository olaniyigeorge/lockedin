import { NextResponse } from 'next/server';
import { connectToDB } from '@/services/db_mongo';
import HabitChallenge from '@/models/challenge';
import HabitTaskEntry from '@/models/task-entry';
import HabitTask from '@/models/habit-task';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const accessibility = url.searchParams.get("accessibility");
        const id = url.searchParams.get("id");

        await connectToDB();
        if (id) {
            console.log("Getting specific challenge by id ");

            // Fetch challenge by id
            const challenge = await HabitChallenge.findById(id).populate({ path: 'habit', model: HabitTask });
            
            if (challenge && challenge.habit) {
            // Fetch all HabitTaskEntries for the habit
            const habitTaskEntries = await HabitTaskEntry.find({ habit: challenge.habit._id });

            return NextResponse.json(
                {
                message: "Challenges fetched successfully",
                data: { challenge, habitTaskEntries }
                },
                { status: 200 }
            );
            }

            return NextResponse.json(
            {
                message: "Challenge or habit not found",
                data: null
            },
            { status: 404 }
            );
        }

        if (accessibility) {
            console.log("Getting challenges with specified accessibility");

            // Fetch challenges based on the accessibility filter
            const challenges = await HabitChallenge.find({ accessibility });

            return NextResponse.json(
                {
                    message: "Challenges fetched successfully",
                    data: challenges
                },
                { status: 200 }
            );
        }

        return new Response("No accessibility param", { status: 400 });

    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch challenges", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { 
            title, 
            description, 
            aspect, 
            accessibility, 
            habit,
            owner, 
            start_date, 
            end_date, 
            wager_amount, 
            participants, 
            accountability_partners 
        } = await request.json();

        if (!title || !description || !aspect || !owner || !start_date || !end_date || !wager_amount || !participants) {
            return new Response("Missing required fields", { status: 400 });
        }

        await connectToDB();

        const newChallenge = new HabitChallenge({
            title,
            description,
            aspect,
            accessibility,
            habit,
            owner,
            start_date,
            end_date,
            wager_amount,
            participants,
            accountability_partners
        });

        await newChallenge.save();

        return NextResponse.json(
            {
                message: "Challenge created successfully",
                data: newChallenge
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "Error: Failed to create challenge",
                data: error
            },
            { status: 500 }
        );
    }
}