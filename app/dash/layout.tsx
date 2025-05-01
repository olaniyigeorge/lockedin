"use client";

import { Footer } from "@/components/Footer";

import { useGlobalState } from "@/globalStore";
import { useDashboardState } from "@/lib/stores/dashboardStore";
import { Sidebar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen, toggleSidebarOpen} = useGlobalState();
  const { authenticatedUserUser } = useDashboardState()

  // useEffect(() => {
  //   if (typeof window && window.innerWidth > 500) {
  //     console.log("On browser and large screen")
  //     // toggleSidebarOpen(true)
  //   }
  // }, [])
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
                  <Image src={authenticatedUserUser!.image} width={200} height={200} alt='avatar' className="w-10 h-10 border rounded-full items-center"/>
                  <p className="text-center text-md font-medium">{authenticatedUserUser?.first_name} {authenticatedUserUser?.last_name}</p>
                  <p className="text-center text-xs underline">{authenticatedUserUser?.email}</p>
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
