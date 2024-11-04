import { auth, signIn, signOut } from "@/utils/auth"
import Link from "next/link"
import Auth from "@/components/sign-in"
import HabitTaskCard from "@/components/habit-task-card"

export default async function HabitTasksPage() {
    const session = await auth()
    const userId = session?.user?.id
    console.log(session, userId)
    
    let resp: Response = new Response()
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/habit-tasks?owner=${userId}`, {
            method: "GET",
        })
        // console.log(response)
        const res = await response.json()
        // console.log("RES: ", res)
        if (response.ok) {
            resp = new Response(JSON.stringify(res), {status: response.status})
        } else {
            // console.log(res)
            resp = new Response("res", {status : response.status})
        }

    } catch(error){
        console.log(error)
        resp = new Response("Error", {status: 500})
    }

    const res = await resp.json()
    // console.log("LFDOMAINS: ", res)
    if (resp?.status == 200) {
        console.log("response ok")
        return ( <div className="w-full">
            <span className="w-full flex items-center justify-between">
               <span className="">Build new habits one task at a time</span>
               <>{session?.user ?
                    <Link 
                        className="border border-black hover:border-gray-900 p-1 rounded-md" 
                        href="/habit-tasks/new"
                    > 
                        Add Habit task
                    </Link>
               : <Auth />
               }</>
            </span>
            <section className="w-full my-4 gap-2 grid grid-cols-1 md:grid-cols-3">
               {res.map((lfd: any) => (
                <div key={lfd._id} className="w-full flex flex-col  ">
                   <HabitTaskCard {...lfd}/>
                </div>
               ))}
            </section>
        </div>)
        
    }  else {
        console.log("response  not ok")
        return ( <div className="w-full">
             <span className="w-full flex items-center justify-between">
                <>Habit Tasks</>
                <>{session?.user ?
                    <Link href="/habit-tasks/new"> Add habit task</Link>
                : <Auth />
                }</>
            </span>
            <section className="w-full grid grid-cols-1 md:grid-cols-3">
                 Error {/* {JSON.stringify(HabitTasks)} */}
            </section>
        </div>)
    } 
    
}