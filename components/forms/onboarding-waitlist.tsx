"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";


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


    const [ full_name, setFullname ] = useState<string>("")
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
                full_name,
                email: email,
                discovery_location: discovery_location
            })
            const response = await fetch(`/api/waitlist`, {
                method: "POST",
                body: JSON.stringify({
                    full_name: full_name,
                    email: email,
                    discovery_location: discovery_location
                })
            })

            if (response.status == 201) {
               toast.success("Wishlist joined")
               router.push('/')
            } else if(response.status == 409) {
                toast.success(`You have joined the wishlist with these info`)
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
                    <Dialog>
            <DialogTrigger className="rounded-full px-10 py-4 text-lg duration-500 transition bg-transparent border border-green-600 text-green-600 hover:text-white hover:bg-green-600 hover:font-bold hover:border-none leading-none">
              <span>Join Wait List</span>
            </DialogTrigger>
            <DialogContent className="md:p-8 w-fit">
              <DialogHeader className="flex flex-col gap-6">
                <DialogTitle className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                  Experience LockedIn First-hand
                </DialogTitle>
                <DialogDescription className="text-md text-gray-700 md:text-justify">
                  Be among the first set of people to test and use LockedIn app.
                  Stay informed about its development milestones and launch date
                  announcements.
                </DialogDescription>
              </DialogHeader>
                <form className="w-full text-gray-800 shadow glassmorphism p-3 flex gap-2 flex-col border rounded-xl"> 
                <input 
                    className="p-2 rounded-md" 
                    type="name" 
                    name="name"
                    required
                    value={full_name}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder={`Fullname `}
                />
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
                            {location.toUpperCase().replaceAll("_", " ")}
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
            </DialogContent>
          </Dialog>
          
        </div>
    )
}