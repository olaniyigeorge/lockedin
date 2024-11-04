import { connectToDB } from "@/utils/database"
import LifeDomain from "@/models/lockedin.life-domains"


export const POST = async(req: Request) => {
    const { owner, name, description} = await req.json()
    try {
        console.log("Connecting to db")
        await connectToDB()

        console.log("Constructing Life Domain")
        const newLifeDomain = new LifeDomain({
            owner: owner,
            name: name,
            description: description
        })

        console.log("Saving life domain")
        await newLifeDomain.save()

        console.log(newLifeDomain)

        return new Response(JSON.stringify(newLifeDomain), {status: 201})
    } catch(error) {
        console.log(error)
        return new Response("Failed to create prompt", {status: 500})
    }
}