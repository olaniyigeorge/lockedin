import { iLifeDomain } from "@/components/forms/life-domain-form"
import { iHabitTask } from "@/components/habit-task-card"
import { auth, signIn } from "@/utils/auth"


export default async function ProfilePage() {
    const session = await auth()
    if (!session?.user) {
        return (
        <div className="p-10 w-full justify-center flex rounded-xl font-extrabold text-3xl">
            <form action={async () => {
                "use server"
                await signIn("google")
                }}
                className=""
            >
                <button className="rounded-full p-2 text-white border" 
                type="submit">Sign In </button>
            </form>
        </div>)
    }
    
    
    let habitTasks: iHabitTask[] = []
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/habit-tasks?owner=${session.user.id}`, {
            method: "GET",
        });
        habitTasks = await response.json();
    } catch(error){
        console.log(error)
        habitTasks = []
    }

    let lifeDomains: iLifeDomain[] = []
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/life-domains?owner=${session.user.id}`, {
            method: "GET",
        });
        lifeDomains = await response.json();
    } catch(error){
        console.log(error)
        lifeDomains = []
    }
 

    return ( <div className="w-full flex flex-col p-3 md:p-10 border rounded-xl ">
        <h1 className="px-1 text-3xl"><>Hi</> <span className="font-extrabold lockedin_text_gradient ">{session.user.name}</span></h1>
        <span className="text-xs w-fit rounded-full p-1 border border-slate-300">{session.user.email}</span>

        <p className="p-1 font-satoshi">Welcome to your profile </p>

        <span className=""> 
            You are currently tracking {habitTasks.length} habit {habitTasks.length > 1 ? "tasks" : "task"}
        </span>

        <span className=""> 
            You are currently working to improve {lifeDomains.length} {lifeDomains.length > 1 ? "aspects" : "aspect"} of your life 
        </span>
    </div>)
}