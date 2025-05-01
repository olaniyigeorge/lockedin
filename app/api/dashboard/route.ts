
import { NextRequest, NextResponse } from "next/server";
import { getSessionData } from "@/lib/helpers";
import { DashboardManager } from "@/services/handlers/Dashboard";
import { HabitTaskWithEntries } from "../habittasks/[id]/docs";
import { eLifeDomain } from "../lifedomains/docs";
import { iGoal } from "../goals/[id]/docs";

export interface DashboardResponse {
    success: boolean;
    data: {
      habitTasks: HabitTaskWithEntries[];
      lifeDomains: eLifeDomain[];
      goals: iGoal[];
      habitTaskEntries: any[];
    };
  }

export async function GET(req: NextRequest): Promise<Record<string, any>> {
    const sessionData = await getSessionData(req);

    if (!sessionData || !sessionData.user.id) {
        return NextResponse.json(
            {error: "You have to sign in to view dashboard"},
            {status: 401}
        )
    }

    try {
        const user_id = sessionData.user.id
        const dashboard = new DashboardManager(user_id, sessionData);
        console.log(`\n DashboardManager instance created\n`);
        const dashboardData = await dashboard.getDashboardData();
    
        return NextResponse.json({
            success: true,
            data: dashboardData,
            },
            {status: 200}
        );
    } catch(error) {
        console.error(error)
        return NextResponse.json(
            {error: `${error}`},
            {status: 500}
        )
    }
    
  
}
