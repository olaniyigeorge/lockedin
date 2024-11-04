import Link from "next/link";



export default function LockedInLanding() {
    const epl  = [
        "https://x.com/imoctborn",
        "https://x.com/Onimisea"
    ]

    // Select a random link from the epl array
    const randomIndex = Math.floor(Math.random() * epl.length);
    const randomLink = epl[randomIndex];

    return (
        <section className="flex-col  w-full flex items-center gap-4 ">
            <h1 className="w-full font-400 ont-extrabold text-center tracking-wide py-3  text-3xl md:text-5xl lg:text-[60px] ">
                <h1 className="inline w-full">Build Better Habits!</h1> <br/>
               <span className="text-green-500 ">Track Habit Forming Tasks 
                </span> {" "} and Celebrate Your Progress
            </h1> 

            <span className="w-full flex justify-center">
                <Link 
                    className="p-2 w-fit rounded-full bg-white hover:scale-[102%] ease-in-out shadow transition-all duration-500 flex justify-center border bg-opacity-50 " 
                    href={randomLink}
                > 
                    Join the conversation on how to build better habits
                </Link>
            </span>
            
        </section>
    )
}