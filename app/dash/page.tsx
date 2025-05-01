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
                <>Schedule </>
           </div>
           <div className="dashboard-board" id="habit-tasks">
               <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex justify-between"> <>Tasks</> <>({habitTasks.length})</></div>
                {habitTasks.map((task) => (
                    <div key={task._id} className="m-2">
                         <h2 className="text-lg">{task.title}</h2>
                         <p className="text-sm">{task.description}</p>   
                    </div>
               ))}
               </div>
           </div>
           <div className="dashboard-board" id="life-domains">
                <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex justify-between"> <>Life Domains</> <>({lifeDomains.length})</></div>
                {lifeDomains.map((lfd) => (
                    <div key={lfd._id} className="m-2">
                         <h2 className="text-lg">{lfd.name}</h2>
                         <p className="text-sm">{lfd.description}</p>   
                    </div>
               ))}
               </div>
           </div>
           <div className="dashboard-board" id="goals">
               <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex justify-between"> <>Goals</> <>({goals.length})</></div>
                {goals.map((gl) => (
                    <div key={gl._id} className="m-2">
                         <h2 className="text-lg">{gl.name}</h2>
                         <p className="text-sm">{gl.description}</p>   
                    </div>
               ))}
               </div>
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