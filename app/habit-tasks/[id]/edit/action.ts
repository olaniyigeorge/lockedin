import { auth } from "@/utils/auth"




export async function getLifeDomainById(id: string) {
    const session = await auth()
    console.log(session)
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/life-domains/${id}`, {
            method: "GET",
        })
        console.log(response.status)
        const res = await response.json()
        // console.log("RES: ", res)

        return new Response(JSON.stringify(res), {status: response.status})

        
        
    } catch(error){
        console.log(error)
        return new Response("Error", {status: 500})
    }
}