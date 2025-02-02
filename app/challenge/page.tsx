import ChallengeCard, { iChallenge } from "@/components/challenge-card";
import { ArrowRight, SwordsIcon } from "lucide-react";
import Link from "next/link";



export default async function ChallengePage() {
    let challenges: iChallenge[] = []

    try {
        const res = await fetch(
            `${process.env.DOMAIN}/api/challenge?accessibility=public`, 
            { 
                method: "GET" 
            }
        )
        const data = await res.json()
        if (res.ok) {
            challenges = data.data
        }
    } catch(error) {
        console.error('Error fetching challenges:', error);
    }

    return (
        <div className="w-full flex flex-col gap-3 px-2 md:px-4 py-4 font-nunito justify-center items-center">
            <h1 className="m2-4 w-full md:w-2/3 leading-tight text-center font-bebas font-black  tracking-tighter py-3 px-2  text-2xl md:text-[50px] lg:text-[55px]">Join a challenge and stand a chance to earn with other users while building your new habit</h1>
            <Link href="/challenge/new" className="hover:bg-orange-500 hover:text-white border glassimorphism p-4 flex gap-2 items-center">
                <SwordsIcon className="w-8 "/><>Start a challenge</>
                
            </Link>
            <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-4">
                {challenges.map((challenge, index) => (
                    <ChallengeCard key={index} {...challenge} />
                ))}
            </div>
        </div>
    );
}

