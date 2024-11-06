"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export const DISCOVERY_LOCATION: string[] = [
    'telegram_bot',
    'web',
    'twitter',
    'family_and_friends'
]
export interface WaitlistFormProps{
    type: "Join" | "Update"
}

export default function WaitlistForm(data : WaitlistFormProps) {
    const router = useRouter()
    const type = new URLSearchParams().get("type")


    const [ email, setEmail ] = useState<string>("")
    const [ action, setAction ] = useState<"Join" | "update">("Join")
    const [ discovery_location, setDiscovery_location ] = useState<string>("web")
    const [ submitting, setSubmitting ] = useState<boolean>(false)
    
    useEffect(() => {
        if (!type) {
            setAction("Join"); 
        }
    }, [type]);

    const createLifeDomain = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            console.log({
                email: email,
                discovery_location: discovery_location
            })
            const response = await fetch(`/api/lockedin/waitlist`, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    discovery_location: discovery_location
                })
            })

            if (response.ok) {
               toast.success("Wishlist joined")
               router.push('/')
            } else {
                toast.error(`Error ${response.status} while joining wishlist`)
            }
        } catch(error) {
            toast.error(`Error while joining wishlist`)
            console.log(error)
            return false
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl lockedin_text_gradient font-extrabold">{data.type} Wishlist</h1>
            <form className="w-full text-gray-800 shadow glassmorphism p-3 flex gap-2 flex-col border rounded-xl"> 
                <input 
                    className="p-2 rounded-md" 
                    type="email" 
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={`Email`}
                />  
                <select
                    className="flex gap-2 border ring-0 outline-none p-2 rounded-lg justify-center text-green-600"
                    onChange={(e) => setDiscovery_location(e.target.value)}
                >
                    <option className="bg-transparent  text-slate-900" value="friends_family" >
                        How did you hear about us?
                    </option>
                    {DISCOVERY_LOCATION.map((location: string) => (
                        <option key={location} className="bg-transparent   text-slate-900" value={location}>
                            {location.toUpperCase().replace("_", " ")}
                        </option>
                    ))}
                </select>
                <span className="w-full flex items-center justify-center">
                <button
                    type='submit'
                    disabled={submitting}
                    className='border hover:bg-green-600 bg-orange-200 hover:text-white border-green-600  p-2 w-full md:w-1/2 justify-end rounded-md text-green-600'
                    onClick={createLifeDomain}
                >
                    {submitting ? `${data.type}ing...` : data.type}
                </button>
                </span>
                
            </form>
        </div>
    )
}