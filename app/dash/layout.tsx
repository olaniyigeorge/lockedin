"use client";

import { Footer } from "@/components/Footer";

import { useGlobalState } from "@/globalStore";
import { useDashboardState } from "@/lib/stores/dashboardStore";
import { Sidebar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { DashboardResponse } from "../api/dashboard/route";
import LogoutButton from "@/components/logoutBtn";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen, toggleSidebarOpen, loggedInUser } = useGlobalState();
  const { authenticatedUserUser, setAuthenticatedUserUser, manageHabitTasks, manageGoals, manageLifeDomains, manageHabitTaskEntries } = useDashboardState()

  if (!authenticatedUserUser && loggedInUser) {
    setAuthenticatedUserUser(loggedInUser)
    console.log("\n\n Authenticated User set as \n", authenticatedUserUser, "\n\n")

  }

  useEffect(() => {
    const fetchDashData = async () => {
      try {
        const dashData: DashboardResponse = await getDashData();
        console.log(`\n\n ${JSON.stringify(dashData.data.habitTasks[0])} \n\n`)
        
        manageHabitTasks(dashData.data.habitTasks);
        manageGoals(dashData.data.goals);
        manageLifeDomains(dashData.data.lifeDomains);
        manageHabitTaskEntries(dashData.data.habitTaskEntries);

        console.log("Dashboard data set in store");
      } catch (error) {
        console.error("Failed to fetch or set dashboard data:", error);
      }
    };

    fetchDashData();
  }, []);

  return (
    <div className="">
     

      <div className="w-full min-h-screen gap-2 flex flex-col items-start md:flex-row p-2">
       
          {isSidebarOpen ? 
            <div className="h-full overflow-y-auto w-full md:max-w-[250px]">
              <div className=" w-full gap-3 flex flex-col justify-start shadow-lg h-full shadow-green-800 p-2">
                <Sidebar onClick={() => toggleSidebarOpen(false)} className="w-5 h-5 flex justify-end" />
                <Link href="#schedule" className="dashNavBarLinks"> Schedule </Link>
                <Link href="#habit-tasks" className="dashNavBarLinks"> Tasks </Link>
                <Link href="#activities" className="dashNavBarLinks"> Activities </Link>
                <Link href="#life-domains" className="dashNavBarLinks"> Life Domains </Link>
                <Link href="#goals" className="dashNavBarLinks"> Goals </Link>
                <Link href="#overview" className="dashNavBarLinks"> Overview </Link>




                <div className="w-full mt-20 flex flex-col justify-center items-center">
                  <Link href="/">
                    <Image src={loggedInUser!.image} width={200} height={200} alt='avatar' className="w-10 h-10 border rounded-full items-center"/>
                  </Link>
                  <p className="text-center text-md font-medium">{loggedInUser?.first_name} {loggedInUser?.last_name}</p>
                  <p className="text-center text-xs underline">{loggedInUser?.email}</p>
                  <LogoutButton />
                </div>
              </div>
            </div>
            :
            <Sidebar onClick={() => toggleSidebarOpen(true)} className="w-5 h-5 m-1" />
          }
       
         <main className="w-full">{children}</main>
      </div>
     
      <Footer />
    </div>
  );
};
export default Layout;

export async function getDashData() {
  try {
    const response = await fetch(`/api/dashboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}