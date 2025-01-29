import { redirect } from "next/navigation";



export async function getLifeDomains(userId: string) {
 
    if (userId) {
        redirect("/auth/signin");
    }
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/life-domains?owner=${userId}`, {
            method: "GET",
        })
        const res = await response.json()
        if (response.ok) {
            return new Response(JSON.stringify(res), {status: response.status})
        } else {
            return new Response("res", {status : response.status})
        }

    } catch(error){
        console.error(error)
        return new Response("Error", {status: 500})
    }
}