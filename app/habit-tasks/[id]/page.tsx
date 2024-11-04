import MarkTodayButton from "@/components/lockedin/mark-today-button";

export default async function HabitTaskDetailsPage({ params }: { params: { id: string } }) {
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/lockedin/habit-tasks?id=${params.id}`, {
            method: "GET",
        });
        const habitTask = await response.json();

        if (response.ok) {
              return (
                <div className="container mx-auto p-4 bg-white bg-opacity-30 backdrop-blur shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold mb-2">{habitTask.title}</h1>
                    <p className="text-gray-700 mb-4">{habitTask.description}</p>

                    <div className="flex justify-between items-center mb-4">
                        <span className={`badge p-1 rounded-full ${habitTask.accessibility === "public" ? "bg-green-200" : habitTask.accessibility === "private" ? "bg-red-200" : "bg-blue-200"}`}>
                            {habitTask.accessibility.charAt(0).toUpperCase() + habitTask.accessibility.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(habitTask.start_date).toLocaleDateString()} - {new Date(habitTask.end_date).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Map through entries and display them */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Entries</h2>
                        {habitTask.entries.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {habitTask.entries.map((entry: any) => (
                                    <li key={entry._id} className="text-gray-700">
                                        {new Date(entry.date).toLocaleDateString()}: {entry.completed ? 'Completed' : 'Not Completed'}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No entries for today.</p>
                        )}
                    </div>

                    <MarkTodayButton habitId={params.id} />
                </div>
            );
        } else {
            return (
                <span className="">
                    <>{response.status}</>
                    <div className="">
                        This Habit Task {params.id}
                    </div>
                </span>
            );
        }
    } catch (error) {
        console.log(error);
        return (
            <span className="">
                <>Error</>
                <div className="">
                    This Habit Task {params.id}
                </div>
            </span>
        );
    }
}

























// import MarkTodayButton from "@/components/lockedin/mark-today-button";

// export default async function HabitTaskDetailsPage({ params }: { params: { id: string } }) {
//     try {
//         // Fetch the habit task details
//         const response = await fetch(`${process.env.DOMAIN}/api/lockedin/habit-tasks?id=${params.id}`, {
//             method: "GET",
//         });
//         const habitTask = await response.json();

//         if (response.ok) {
//             // Check for an entry for today
//             const today = new Date();
//             today.setHours(0, 0, 0, 0); // Normalize to midnight
//             const todayString = today.toISOString().split('T')[0]; // Format to YYYY-MM-DD

//             const entryResponse = await fetch(`${process.env.DOMAIN}/api/lockedin/habit-task-entries?habit=${params.id}&date=${todayString}`);
//             const entryData = await entryResponse.json();
//             const hasEntryForToday = entryResponse.ok && entryData.length > 0;

//             return (
//                 <div className="container mx-auto p-4 shadow-lg rounded-lg">
//                     <h1 className="text-2xl font-bold mb-2">{habitTask.title}</h1>
//                     <p className="text-gray-700 mb-4">{habitTask.description}</p>

//                     <div className="flex justify-between items-center mb-4">
//                         <span className={`badge p-1 rounded-full ${habitTask.accessibility === "public" ? "bg-green-200" : habitTask.accessibility === "private" ? "bg-red-200" : "bg-blue-200"}`}>
//                             {habitTask.accessibility.charAt(0).toUpperCase() + habitTask.accessibility.slice(1)}
//                         </span>
//                         <span className="text-sm text-gray-500">
//                             {new Date(habitTask.start_date).toLocaleDateString()} - {new Date(habitTask.end_date).toLocaleDateString()}
//                         </span>
//                     </div>

//                     {!hasEntryForToday && <MarkTodayButton habitId={params.id} />} {/* Show button only if no entry exists */}
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
