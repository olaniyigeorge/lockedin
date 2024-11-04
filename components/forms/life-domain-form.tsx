"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export interface iLifeDomain{
    _id?: string
    name: string;
    description: string;
    owner: string
}
export interface LifeDomainFormProps{
    type: "Create" | "Edit" | "Delete"
    user: string;
    lfd: iLifeDomain
}

export default function LifeDomainForm(data : LifeDomainFormProps) {
    const router = useRouter()
    const [ lifeDomain, setLifeDomain ] = useState<iLifeDomain>({
        name: data.lfd.name,
        description: data.lfd.description,
        owner: data.user
    })
    const [ user, setUser ] = useState<string>("")
    const [ type, setType ] = useState<string>("")
    const [ submitting, setSubmitting ] = useState<boolean>(false)
    useEffect(() => {
        setLifeDomain(data.lfd); // Reset form state when lfd changes
    }, [data.lfd]);

    const createLifeDomain = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            console.log({
                owner: data.user,
                name: lifeDomain.name,
                description: lifeDomain.description
            })
            const response = await fetch(`/api/lockedin/life-domains/new`, {
                method: "POST",
                body: JSON.stringify({
                    owner: data.user,
                    name: lifeDomain.name,
                    description: lifeDomain.description
                })
            })

            if (response.ok) {
               toast.success("Life Domain created")
               router.push('/i/lockedin/life-domains')
            } else {
                toast.error(`Error ${response.status} while creating life domain`)
            }
        } catch(error) {
            toast.error(`Error while creating life domain`)
            console.log(error)
            return false
        } finally {
            setSubmitting(false)
        }
    }

    // const editLifeDomain = async (e) => {
    //     console.log("Editting...")
    // }

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl lockedin_purple_gradient font-extrabold">{data.type} Life Domain</h1>
            <form className="w-full text-gray-800 p-3 flex gap-2 flex-col border rounded-xl"> 
                <input 
                    className="p-2 rounded-md" 
                    type="text" 
                    name="name"
                    value={lifeDomain.name}
                    onChange={(e) => setLifeDomain({ ...lifeDomain, name: e.target.value })}
                    placeholder={`What aspect of your life is this? ${data.user}`}
                />  
                <textarea 
                    className="p-2 rounded-md" 
                    name="name"
                    value={lifeDomain.description}
                    onChange={(e) => setLifeDomain({ ...lifeDomain, description: e.target.value })}
                    placeholder="Describe this aspect of your life and what you want to achieve. "
                />  
                <button
                    type='submit'
                    disabled={submitting}
                    className='border hover:bg-green-500 p-2 w-fit justify-end rounded-md text-white'
                    onClick={(e) => {
                        if (data.type == "Create") {
                            createLifeDomain(e)
                        }
                        else if(data.type == "Edit") {
                            // editLifeDomain(e)

                        }}}
                >
                    {submitting ? `${type}ing...` : data.type}
                </button>
            </form>
        </div>
    )
}