import { auth } from "@/services/auth.nextauth"




export async function getLifeDomainById(id: string) {
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/life-domains/${id}`, {
            method: "GET",
        })
        const res = await response.json()
        return new Response(JSON.stringify(res), {status: response.status})

    } catch(error){
        console.log(error)
        return new Response("Error", {status: 500})
    }
}