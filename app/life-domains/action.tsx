import { redirect } from "next/navigation";



export async function getLifeDomains(userId: string) {
 
    if (userId) {
        redirect("/auth/signin");
    }
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/life-domains?owner=${userId}`, {
            method: "GET",
        })
        // console.log(response)
        const res = await response.json()
        // console.log("RES: ", res)
        if (response.ok) {
            return new Response(JSON.stringify(res), {status: response.status})
        } else {
            // console.log(res)
            return new Response("res", {status : response.status})
        }

    } catch(error){
        console.log(error)
        return new Response("Error", {status: 500})
    }
}