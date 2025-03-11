// "use client";

// import { DumbbellIcon, PlusIcon, Share2Icon, Users2Icon } from "lucide-react";
// import TrackerCalenderView, { iHabitTaskEntry } from "./tracker-calender";
// import Image from "next/image";
// import { formatDate, getDaysInRange, isToday } from "@/utils/helpers";
// import Link from "next/link";
// import { iHabitTask } from "./habit-task-card";
// import { useEffect, useState } from "react";
// import { ChallengeData } from "@/app/challenge/actions";

// interface iPartner{
//     name: string
//     ap_status: "accepted" | "pending"
//     amount_staked: number
// }


// export interface iChallengeInfo {
//     _id: string
//     title: string
//     description: string
//     aspect: string
//     status?: "active" | "inactive"
//     entries: iHabitTaskEntry[]
//     accessibility: string
//     owner: string
//     habit: iHabitTask
//     start_date: string
//     end_date: string
//     wager_amount: number
//     financial_summary: {
//         total_collected: number,
//         total_paid_out: number,
//         remaining_pool: number
//     }
//     participants: iPartner[]
//     accountability_partners: iPartner[]
//     createdAt: string
//     updatedAt: string
//     __v: number
// }

// export interface iChallengeActivity {
//     _id: string
//     challenge: string
//     user: string
//     type: "wager_updated" | "joined" |"entry_logged" |"payout_made" |"challenge_completed"
//     message: string
//     timestamp: Date
// }


// const accessibilityColors: Record<iHabitTask["accessibility"], string> = {
//     public: "bg-green-500",
//     private: "bg-red-500",
//     partnership: "bg-blue-500",
// };


// export default function ChallengePage(challenge: iChallengeInfo) {
//     const [activities, setActivities] = useState<iChallengeActivity[]>([]);

//     useEffect(() => {
//         const fetchActivities = async () => {
//             try {
//                 const response = await fetch(`/api/challenge/activities?challengeId=${challenge._id}`);
//                 const data = await response.json();
//                 console.log("activities: ", data)
//                 setActivities(data.data);
//             } catch (error) {
//                 console.error("Error fetching activities:", error);
//             }
//         };

//         fetchActivities();
//     }, [challenge]);
//     // Create a set of completed entry dates for quick lookup
//     const completedDates = new Set(challenge.entries.map(entry => new Date(entry.date).toDateString()));

//     // Generate all dates in the range from start_date to end_date
//     const dateRange = getDaysInRange(new Date(challenge.start_date), new Date(challenge.end_date));
    


//     return (
//         <div className="w-full flex flex-col gap-3 bg-white bg-opacity-60  px-2 md:px-4 py-4 font-nunito z-0">
//             <span className="flex flex-col md:flex-row justify-between  items-center gap-2 transition-all transform ease-in-out duration-500">
//                 <h1 className="text-2xl font-bold">{challenge.title}</h1>
                
//                 <span className="flex items-center gap-2 text-sm">
//                     <button className="hover:scale-[105%] transition-all ease-in-out px-2 py-1 bg-white text-black rounded-md border flex items-center gap-1">
//                         <PlusIcon className="w-4 h-4"/>
//                         <>Invite Friend</>
//                     </button>
//                     <button className="hover:scale-[105%] transition-all ease-in-out px-2 py-1 rounded-md border flex items-center gap-1">
//                         <Share2Icon className="w-4 h-4" />
//                         <>Share</>
//                     </button>
//                     <button className="hover:scale-[105%] transition-all ease-in-out px-2 py-1 bg-red-500 rounded-md ">
//                         <>Close Wager</>
//                     </button>
//                 </span>
//             </span>

//             <section className="w-full h-full flex flex-col md:flex-row justify-between items-stretch gap-3 transition-all transform ease-in-out duration-500">
//                 <section id="the-bet" className="w-full glassimorphism md:w-2/3 rounded-lg border border-slate-300 min-h-[200px]  p-2 md:p-3 flex flex-col gap-1">
//                     <h2 className="font-medium">The Bet</h2>
//                     <p className="text-xs border py-[1px] px-2 w-fit rounded-full">{challenge.status}</p>
//                     <h2 className="">{challenge.description}</h2>
//                     <span className="flex flex-col gap-1">
//                         <h2 className="text-gray-400 text-xs">Wager Amount</h2>
//                         <p className="font-extrabold">${challenge.wager_amount}</p>
//                     </span>
//                 </section>
//                 <section id="financial-summary" className="w-full glassimorphism md:w-1/3 rounded-lg border  min-h-[200px]  p-2 md:p-3 flex flex-col">
//                     <h2 className="font-bold">Financial Summary</h2>
//                     <span className="flex flex-col">
//                         <h2 className="text-gray-400 text-xs">Total Collected</h2>
//                         <p className="font-extrabold text-green-500">${challenge["financial_summary"]["total_collected"]}</p>
//                     </span>
//                     <span className="flex flex-col">
//                         <h2 className="text-gray-400 text-xs">Total Paid Out</h2>
//                         <p className="font-extrabold text-blue-500">${challenge["financial_summary"]["total_paid_out"]}</p>
//                     </span>
//                     <span className="flex flex-col border-t my-2 py-1 ">
//                         <h2 className="text-gray-400 text-xs">Remaining Pool</h2>
//                         <p className="font-extrabold text-orange-500">${challenge["financial_summary"]["remaining_pool"]}</p>
//                     </span>
//                 </section>
//             </section>

//             <section className="w-full h-full flex flex-col  md:flex-row justify-between items-stretch gap-3">
//                 <section id="calender" className="w-full glassimorphism md:w-2/3 rounded-lg border  min-h-[200px]  p-2 md:p-3 flex flex-col gap-1">
                    
//                     <div className="w-full">
//                     <div className={`h-[2px] ${accessibilityColors[challenge.habit.accessibility]} rounded-full`}></div>
//                         <div className="">
//                             <section className="flex justify-between items-center my-1">
//                                 <h1 className="font-bold flex justify-between items-center w-fit mt-1">
//                                     <Link 
//                                         href={`/habittasks/${challenge.habit._id}`}
//                                         className="">
//                                         {challenge.habit.title}
//                                     </Link>
//                                 </h1>
//                                 <span className={`p-1 h-fit w-fit text-xs flex justify-center rounded-full ${challenge.habit.accessibility === "public" ? "bg-green-200" : challenge.habit.accessibility === "private" ? "bg-red-200" : "bg-blue-200"}`}>
//                                     {challenge.habit.accessibility.toLocaleLowerCase()}
//                                 </span>
//                             </section>
                            
//                             <span className="">{challenge.habit.description}</span>
//                         </div>

//                         <div className="flex flex-wrap gap-1 mt-2">
//                             {dateRange.map(date => (
//                                 <div
//                                     key={date.toDateString()}
//                                     className={`h-4 w-4 flex items-center justify-center rounded ${completedDates.has(date.toDateString()) ? 'bg-green-500' : 'bg-gray-200'} ${isToday(date) ? 'border-2 border-orange-500' : ''}`}
//                                 >
//                                     {completedDates.has(date.toDateString()) && (
//                                         <span className="text-white text-xs">✔️</span>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="text-sm text-gray-600 mt-2">
//                             <p className="text-xs">Duration: {formatDate(challenge.habit.start_date)} -- {formatDate(challenge.habit.end_date)}</p>
//                         </div>
//                     </div>


//                 </section>

//                 <section id="participants" className="w-full glassimorphism md:w-1/3 rounded-lg border min-h-[200px] max-h-[400px] overflow-y-auto p-2 md:p-3 flex flex-col">
//                     <span className="flex justify-between items-center gap-2">
//                         <span className="flex items-center gap-2">
//                             <h2 className="font-bold text-xl">Participants</h2>
//                             <span className="border text-xs bg-gray-500 font-bold py-1 px-2 rounded-full text-white">
//                                 {challenge.participants.length}
//                             </span>
//                         </span>
//                         <Users2Icon className="w-4 h-4" />
//                     </span>
                    
//                     <span className="flex flex-col overflow-y-auto">
//                         {challenge.participants.map((challenger) => (
//                             <span 
//                                 key={challenger.name}
//                                 className="flex gap-2 items-center">
//                                 <Image 
//                                     className="w-10 h-10 object-contain rounded-full border" 
//                                     src={"/assest/images/logo.png"}
//                                     width={10}
//                                     height={10}
//                                     alt="logo"
//                                 />
//                                 <span className="">
//                                     <p className="text-sm">{challenger.name}</p>
//                                     <p className="bg-green-500 text-[10px] w-fit px-2 py-[1px] rounded-full text-white">{challenger["ap_status"]}</p>
//                                 </span>
//                             </span>
//                         ))}
//                     </span>
                    
//                     <span className="flex justify-between items-center gap-2 mt-8">
//                         <span className="flex items-center gap-2">
//                             <h2 className="font-bold text-xl">Acc Partners</h2>
//                             <span className="border text-xs bg-gray-500 font-bold py-1 px-2 rounded-full text-white">
//                                 {challenge.accountability_partners.length}
//                             </span>
//                         </span>
//                         <Users2Icon className="w-4 h-4" />
//                     </span>
                    
//                     <span className="flex flex-col overflow-y-auto">
//                         {challenge.accountability_partners.map((partner) => (
//                             <span 
//                                 key={partner.name}
//                                 className="flex gap-2 items-center">
//                                 <Image 
//                                     className="w-10 h-10 object-contain rounded-full border" 
//                                     src={"/assest/images/logo.png"}
//                                     width={10}
//                                     height={10}
//                                     alt="logo"
//                                 />
//                                 <span className="">
//                                     <p className="text-sm">{partner.name}</p>
//                                     <p className="bg-green-500 text-[10px] w-fit px-2 py-[1px] rounded-full text-white">{partner["ap_status"]}</p>
//                                 </span>
//                             </span>
//                         ))}
//                     </span>
                    
//                 </section>
//             </section>

//             <section id="activity-timeline" className="w-full glassimorphism h-full flex flex-col md:flex-row justify-between items-stretch gap-3">
//                 <section id="participants" className="w-full rounded-lg border min-h-[200px] overflow-y-auto p-2 md:p-3 flex flex-col">
//                     <h2 className="font-bold text-xl">Activity Timeline</h2>
                    
//                     <span className="flex flex-col">
//                         {activities.map((act) => (
//                             <span 
//                                 key={act._id}
//                                 className="flex gap-4 items-start"
//                             >
//                                 <span className="flex flex-col gap-1 items-center ">
//                                     <p className="text-sm text-gray-500">{new Date(act.timestamp).toDateString().slice(3,10)} </p>
//                                     <span className="border-l border-gray- h-[50px]"></span>
//                                 </span>

           
                                                     
//                                 {challenge.aspect === "Health" && (
//                                     <DumbbellIcon className="p-2 rounded-full bg-green-500" />
//                                 )}
//                                 {challenge.aspect === "Productivity" && (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 p-2 rounded-full bg-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 9h18M3 15h18M3 21h18" />
//                                     </svg>
//                                 )}
//                                 {challenge.aspect === "Finance" && (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 p-2 rounded-full bg-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.4 0-8-1.8-8-4V6c0-2.2 3.6-4 8-4s8 1.8 8 4v8c0 2.2-3.6 4-8 4z" />
//                                     </svg>
//                                 )}
//                                 {challenge.aspect === "Mindfulness" && (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 p-2 rounded-full bg-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.4 0-8-1.8-8-4V6c0-2.2 3.6-4 8-4s8 1.8 8 4v8c0 2.2-3.6 4-8 4z" />
//                                     </svg>
//                                 )}
//                                 {challenge.aspect === "Other" && (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 p-2 rounded-full bg-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.4 0-8-1.8-8-4V6c0-2.2 3.6-4 8-4s8 1.8 8 4v8c0 2.2-3.6 4-8 4z" />
//                                     </svg>
//                                 )}


//                                 <span className="">
//                                     <p className="text-sm text-white">
//                                         {act.user} {act.type === "wager_updated" && "updated their wager"}
//                                         {act.type === "joined" && "joined the challenge"}
//                                         {act.type === "entry_logged" && "logged an entry for this challenge"}
//                                         {act.type === "payout_made" && "received some payout"}
//                                         {act.type === "challenge_completed" && "completed the challenge"}
//                                     </p>
//                                     <p className="bg-gray-500 text-[10px] w-fit px-2 py-[1px] rounded-full text-white">
//                                         {act.type.replace("_", " ")}
//                                     </p>
//                                 </span>
//                             </span>
//                         ))}
//                     </span>
                    
//                 </section>
//             </section>
//         </div>
//     )
// }