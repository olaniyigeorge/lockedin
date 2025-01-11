// import { DeleteHabitTaskBtn } from "@/components/btns";
// import MarkTodayButton from "@/components/mark-today-button";
// import { auth } from "@/utils/auth";
// import Link from "next/link";

// export default async function HabitTaskDetailsPage({ params }: { params: { id: string } }) {
//     const session = await auth()
//     try {
//         const response = await fetch(`${process.env.DOMAIN}/api/lockedin/habit-tasks?id=${params.id}`, {
//             method: "GET",
//         });
//         const habitTask = await response.json();



//         if (response.ok) {
//               return (
//                 <div className="container mx-auto p-4 bg-white bg-opacity-30 backdrop-blur shadow-lg rounded-lg">
//                     <span className='w-full flex items-center justify-between'>
//                         <h1 className="text-2xl font-bold mb-2">{habitTask.title}</h1> 

//                         {session?.user && session?.user.id == habitTask.owner &&
//                             <span className="flex gap-2 items-center">
//                                 <Link 
//                                     className="shadow bg-orange-200 p-2 rounded-3xl text-sm" href={`/habit-tasks/${params.id}/edit`}>
//                                     Edit
//                                 </Link> 

//                                <DeleteHabitTaskBtn id={params.id} />
//                             </span>
//                         }
                         
//                     </span>
                    
//                     <p className="text-gray-700 mb-4">{habitTask.description}</p>

//                     <div className="flex justify-between items-center mb-4">
//                         <span className={`text-sm p-1 rounded-full ${habitTask.accessibility === "public" ? "bg-green-200" : habitTask.accessibility === "private" ? "bg-red-200" : "bg-blue-200"}`}>
//                             {habitTask.accessibility.charAt(0).toUpperCase() + habitTask.accessibility.slice(1)}
//                         </span>
//                         <span className="text-sm text-gray-500">
//                             {new Date(habitTask.start_date).toLocaleDateString()} - {new Date(habitTask.end_date).toLocaleDateString()}
//                         </span>
//                     </div>

//                     {/* Map through entries and display them */}
//                     <div className="mb-4">
//                         <h2 className="text-xl font-semibold mb-2">Entries</h2>
//                         {habitTask.entries.length > 0 ? (
//                             <ul className="list-disc pl-5">
//                                 {habitTask.entries.map((entry: any) => (
//                                     <li key={entry._id} className="text-gray-700">
//                                         {new Date(entry.date).toLocaleDateString()}: {entry.completed ? 'Completed' : 'Not Completed'}
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-gray-500">No entries for today.</p>
//                         )}
//                     </div>

//                     <MarkTodayButton habitId={params.id} />
//                 </div>
//             );
//         } else {
//             return (
//                 <span className="">
//                     <>{response.status}</>
//                     <div className="">
//                         This Habit Task {params.id}
//                     </div>
//                 </span>
//             );
//         }
//     } catch (error) {
//         console.log(error);
//         return (
//             <span className="">
//                 <>Error</>
//                 <div className="">
//                     This Habit Task {params.id}
//                 </div>
//             </span>
//         );
//     }
// }






















export default function HabitTaskDetailsPage() {

    return (
        <></>
    )
}
