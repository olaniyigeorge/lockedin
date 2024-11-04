import LifeDomain from "@/models/lockedin.life-domains";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {
    console.log("getting lockedin API home  ", request)
    try {
        return new Response(JSON.stringify("LockedIn Home"), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domains created by user", { status: 500 });
    }
}

