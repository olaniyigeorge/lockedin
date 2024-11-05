import { auth } from "@/utils/auth"




export async function getHabitTaskById(id: string) {
    const session = await auth()

    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/habit-tasks?id=${id}`, {
            method: "GET",
        })
        console.log(response.status)
        const res = await response.json()

        return new Response(JSON.stringify(res), {status: response.status})

        
        
    } catch(error){
        console.log(error)
        return new Response("Error", {status: 500})
    }
}