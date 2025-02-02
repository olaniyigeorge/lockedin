import { ChallengeActivity } from "@/models/challenge";
import User from "@/models/user";
import { connectToDB } from "@/services/db_mongo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const challengeId = url.searchParams.get("challengeId");
        const id = url.searchParams.get("id");

        await connectToDB();
        if (challengeId) {
            console.log("Getting challenge activities for this challenge by challengeId");

            // Fetch challenge by id
            const activities = await ChallengeActivity.find({ challenge: challengeId }).populate({ path: 'user', model: User });

            return NextResponse.json(
                {
                    message: "Challenge Activities fetched successfully",
                    data: activities
                },
                { status: 200 }
            );
        }

        if (id) {
            console.log("Getting challenges with specified id");

            // Fetch a challenge activity by id
            const challenge = await ChallengeActivity.findOne({ _id: id });

            return NextResponse.json(
                {
                    message: "Challenges fetched successfully",
                    data: challenge
                },
                { status: 200 }
            );
        }

        return new Response("No accessibility param", { status: 400 });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Challenge activities not found",
                data: null
            },
            { status: 404 }
        );
    }
}