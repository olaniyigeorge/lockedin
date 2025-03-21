import { NextRequest } from "next/server";
import { getSessionData } from "./helpers";

const DOMAIN = process.env.DOMAIN as string;

export async function log(req: NextRequest) {
    const sessionData = await getSessionData(req);

    const user = sessionData?.user?.id || 
        req?.ip || 
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
        "Unknown";

    const details = {
        method: req.method,
        url: req.url,
        headers: Object.fromEntries(req.headers.entries()),
        userAgent: req.headers.get("user-agent") || "Unknown",
        ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "Unknown",
    };

    const logInstance = {
        user,
        details: JSON.stringify(details),
    };

    try {
        const res = await fetch(`${DOMAIN}/api/logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(logInstance),
        });

        if (!res.ok) {
            return "Logging error";
        }
        return "Logged";
    } catch (error) {
        console.error("Failed to send log to remote server:", error);
        return "Logging error";
    }
}