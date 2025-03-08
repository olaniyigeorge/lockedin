import { NextResponse } from 'next/server';
import { connectToDB } from '@/services/db_mongo';
import LifeDomain from '@/models/life-domain';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (id) {
            await connectToDB();
            const lifeDomain = await LifeDomain.findById(id); 

            if (lifeDomain) {
                return NextResponse.json(
                    {
                        message: "success",
                        data: lifeDomain
                    },
                    {
                        status: 200
                    }
                );
            } else {
                return NextResponse.json(
                    {
                        message: "Life domain not found"
                    },
                    {
                        status: 404
                    }
                );
            }
        }

        return NextResponse.json(
            {
                message: "No ID provided"
            },
            {
                status: 400
            }
        );
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch life domain", { status: 500 });
    }
}


export async function PATCH(request: Request) {
    const { name, description } = await request.json();

    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();


        if (id) {
            console.log("Getting this life domain")
            await connectToDB();
            const life_domain = await LifeDomain.findById(id); 
            
            if (!life_domain) {
                return new Response("Life domain not found", { status: 404 });
            }
            life_domain.name = name;
            life_domain.description = description;

            await life_domain.save()

            return new Response("Successfully updated life domain", { status: 200 })
        }

        return new Response("Couldn't get ID", { status: 400}) 
    } catch (error) {
        console.error(error);
        return new Response("Error while attempting Life Domain update", { status: 500 });
    }
}