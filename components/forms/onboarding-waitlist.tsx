"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function WaitlistForm({ type }: WaitlistFormProps) {
    const router = useRouter();
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [action, setAction] = useState<"Join" | "Update">("Join");
    const [discoveryLocation, setDiscoveryLocation] = useState<string>("web");
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (!type) {
            setAction("Join");
        }
    }, [type]);

    const joinWaitlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/waitlist`, {
                method: "POST",
                body: JSON.stringify({
                    full_name: fullName,
                    email: email,
                    discovery_location: discoveryLocation
                })
            });

            if (response.status === 201) {
                toast.success("Waitlist joined");
                resetForm();
                router.push('/');
            } else if (response.status === 200) {
                toast.success("There appears to be a reservation for you with this email");
                resetForm();
            } else {
                toast.error(`Error ${response.status} while joining waitlist`);
            }
        } catch (error) {
            toast.error("Error while joining waitlist");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setDiscoveryLocation("web");
    };

    return (
        <div className="w-full flex flex-col justify-center items-center min-h-[500px]">
            <div className="flex flex-col md:flex-row max-w-[80%] gap-4 justify-between">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-white text-[60px] font-bold leading-tighter tracking-tighter">
                        Experience LockedIn First-hand
                    </h2>
                    <p className="text-[20px] text-center">
                        Be among the first set of people to test and use LockedIn app.
                        Stay informed about its development milestones and launch date
                        announcements.
                    </p>
                </div>
                <form className="w-full flex flex-col gap-4 glassmorphism rounded-lg p-3">
                    <input
                        className="inputs"
                        type="text"
                        name="name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Fullname"
                    />
                    <input
                        className="inputs"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <select
                        className="inputs"
                        required
                        value={discoveryLocation}
                        onChange={(e) => setDiscoveryLocation(e.target.value)}
                    >
                        <option value="web" disabled>
                            How did you hear about us?
                        </option>
                        {DISCOVERY_LOCATION.map((location) => (
                            <option key={location} value={location}>
                                {location.toUpperCase().replaceAll("_", " ")}
                            </option>
                        ))}
                    </select>
                    <span className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="accent_btn w-1/3"
                            onClick={joinWaitlist}
                        >
                            {submitting ? `${type}ing...` : type}
                        </button>
                    </span>
                </form>
            </div>
        </div>
    );
}



export interface WaitlistFormProps {
    type: "Join" | "Update"
}

export const DISCOVERY_LOCATION: string[] = [
    'telegram_bot',
    'web',
    'twitter',
    'family_and_friends',
    'linkedin'
];