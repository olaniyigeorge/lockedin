import { DumbbellIcon, PlusIcon, Share2Icon, Users2Icon } from "lucide-react";
import TrackerCalenderView, { eHabitTask, iHabitTaskEntry } from "./tracker-calender";
import Image from "next/image";

interface iPartner{
    name: string
    ap_status: "accepted" | "pending"
    amount_staked: number
}


export interface iAccountabilityPartnership{
    _id: string
    task: eHabitTask

    status: "Active" | "Ended"
    wager_amount: number

    financial_summary: {
        total_collected: number,
        total_paid_out: number,
        remaining_pool: number
    }
    participants : iPartner[]
}

export default function AccountabilityPartnership(challenge: iAccountabilityPartnership) {
    

    return (
        <div className="w-full flex flex-col gap-3 px-2 md:px-4 py-4 font-nunito">
            <span className="flex flex-col md:flex-row justify-between  items-center gap-2 transition-all transform ease-in-out duration-500">
                <h1 className="text-2xl font-bold">{challenge.task.title}</h1>
                
                <span className="flex items-center gap-2 text-sm">
                    <button className="hover:scale-[105%] transition-all ease-in-out px-2 py-1 bg-white text-black rounded-md border flex items-center gap-1">
                        <PlusIcon className="w-4 h-4"/>
                        <>Invite Friend</>
                    </button>
                    <button className="hover:scale-[105%] transition-all ease-in-out px-2 py-1 rounded-md border flex items-center gap-1">
                        <Share2Icon className="w-4 h-4" />
                        <>Share</>
                    </button>
                    <button className="hover:scale-[105%] transition-all ease-in-out px-2 py-1 bg-red-500 rounded-md ">
                        <>Close Wager</>
                    </button>
                </span>
            </span>

            <section className="w-full h-full flex flex-col md:flex-row justify-between items-stretch gap-3 transition-all transform ease-in-out duration-500">
                <section id="the-bet" className="w-full md:w-2/3 rounded-lg border  min-h-[200px]  p-2 md:p-3 flex flex-col gap-1">
                    <h2 className="font-medium">The Bet</h2>
                    <p className="text-xs border py-[1px] px-2 w-fit rounded-full">{challenge.status}</p>
                    <h2 className="">{challenge.task.description}</h2>
                    <span className="flex flex-col gap-1">
                        <h2 className="text-gray-400 text-xs">Wager Amount</h2>
                        <p className="font-extrabold">${challenge.wager_amount}</p>
                    </span>
                </section>
                <section id="financial-summary" className="w-full md:w-1/3 rounded-lg border  min-h-[200px]  p-2 md:p-3 flex flex-col">
                    <h2 className="font-bold">Financial Summary</h2>
                    <span className="flex flex-col">
                        <h2 className="text-gray-400 text-xs">Total Collected</h2>
                        <p className="font-extrabold text-green-500">${challenge["financial_summary"]["total_collected"]}</p>
                    </span>
                    <span className="flex flex-col">
                        <h2 className="text-gray-400 text-xs">Total Paid Out</h2>
                        <p className="font-extrabold text-blue-500">${challenge["financial_summary"]["total_paid_out"]}</p>
                    </span>
                    <span className="flex flex-col border-t my-2 py-1 ">
                        <h2 className="text-gray-400 text-xs">Remaining Pool</h2>
                        <p className="font-extrabold text-orange-500">${challenge["financial_summary"]["remaining_pool"]}</p>
                    </span>
                </section>
            </section>

            <section className="w-full h-full flex flex-col md:flex-row justify-between items-stretch gap-3">
                <section id="calender" className="w-full md:w-2/3 rounded-lg border  min-h-[200px]  p-2 md:p-3 flex flex-col gap-1">
                    <TrackerCalenderView {...challenge.task} />
                </section>

                <section id="participants" className="w-full md:w-1/3 rounded-lg border min-h-[200px] overflow-y-auto p-2 md:p-3 flex flex-col">
                    <span className="flex justify-between items-center gap-2">
                        <span className="flex items-center gap-2">
                            <h2 className="font-bold text-xl">Participants</h2>
                            <p className="border text-xs bg-gray-700 font-bold py-[1px] px-2 rounded-full">{challenge.participants.length}</p>
                        </span>
                        <Users2Icon className="w-4 h-4" />
                    </span>
                    
                    <span className="flex flex-col overflow-y-auto">
                        {challenge.participants.map((challenger) => (
                            <span 
                                key={challenger.name}
                                className="flex gap-2 items-center">
                                <Image 
                                    className="w-8 h-8 object-contain rounded-full border" 
                                    src="/images/logo.png"
                                    width={10}
                                    height={10}
                                    alt="logo"
                                />
                                <span className="">
                                    <p className="text-sm">{challenger.name}</p>
                                    <p className="bg-green-500 text-[10px] w-fit px-2 py-[1px] rounded-full text-white">{challenger["ap_status"]}</p>
                                </span>
                            </span>
                        ))}
                    </span>
                    
                </section>
            </section>

            <section id="activity-timeline" className="w-full h-full flex flex-col md:flex-row justify-between items-stretch gap-3">
                <section id="participants" className="w-full rounded-lg border min-h-[200px] overflow-y-auto p-2 md:p-3 flex flex-col">
                    <h2 className="font-bold text-xl">Activity Timeline</h2>
                    
                    <span className="flex flex-col">
                        {challenge.task.entries.map((entry) => (
                            <span 
                                key={entry._id}
                                className="flex gap-4 items-start"
                            >
                                <span className="flex flex-col gap-1 items-center ">
                                    <p className="text-sm text-gray-500">{entry.date.toDateString().slice(3,10)} </p>
                                    <span className="border-l border-gray- h-[50px]"></span>
                                </span>

                                
                                <DumbbellIcon 
                                    className={`p-2 rounded-full ${entry.completed ? "bg-green-500": "bg-red-500"}`} 
                                />

                                <span className="">
                                    <p className="text-sm text-white">{challenge.task.owner._id} {entry.completed ? "marked" : "missed"} {"an entry on this challenge"}</p>
                                    <p className={`${entry.completed ? "bg-green-500" : "bg-red-500"} text-[10px] w-fit px-2 py-[1px] rounded-full text-white`}>{entry.completed ? "Done" : "Missed"}</p>
                                </span>
                            </span>
                        ))}
                    </span>
                    
                </section>
            </section>
        </div>
    )
}