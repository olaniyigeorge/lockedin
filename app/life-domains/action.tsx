import { auth } from "@/utils/auth"
import { redirect } from "next/navigation";



export async function getLifeDomains() {
    const session = await auth()
    console.log(session)

    // Redirect to the auth page if the user is not authenticated
    if (!session?.user?.id) {
        redirect("/sign-in");
    }
    const userId = session.user.id;
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/life-domains?owner=${userId}`, {
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