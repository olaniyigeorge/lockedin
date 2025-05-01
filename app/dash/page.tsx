"use client";


import { useDashboardState } from "@/lib/stores/dashboardStore"
import { useEffect } from "react";

export default function Dashboard() {
    const { habitTasks, lifeDomains, goals, habitTaskEntries, authenticatedUserUser } = useDashboardState()
    console.log("\n\n DashboardState\n", authenticatedUserUser, "\n\n")



    return (
        <div className="overflow-y-auto w-full flex flex-col flex-1">
           <h1 className="text-xl"> Hi! {authenticatedUserUser?.first_name} {authenticatedUserUser?.last_name}</h1> 
           <p className="text-sm">Welcome to your dashboard </p>
           <div className="dashboard-board" id="schedule">
                <>Schedule ({Date()})</>
           </div>
           <div className="dashboard-board" id="habit-tasks">
                <>Tasks ({habitTasks.length})</>
           </div>
           <div className="dashboard-board" id="life-domains">
                <>Life Domains ({lifeDomains.length})</>
           </div>
           <div className="dashboard-board" id="goals">
                <>Goals ({goals.length})</>
           </div>
           <div className="dashboard-board" id="activities">
                <>Activities ({habitTaskEntries.length})</>
           </div>
           <div className="dashboard-board" id="overview">
                <>Overview </>
           </div>
        </div>
    )
}