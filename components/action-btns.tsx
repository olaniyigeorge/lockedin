import { ListIcon, ProportionsIcon, SwordsIcon } from "lucide-react";
import Link from "next/link";

export default function ActionBtns() {


    return (
        <span className="w-full justify-center flex gap-4 md:gap-6 my-10">
            <Link href="/habit-tasks" className="flex  border-gray-300 items-center gap-1 p-4 border rounded hover:scale-[103%] duration-400 animate_style glassmorphism font-medium text-gray-900 hover:bg-orange-200">
                <ListIcon className="w-5 h-5"/> <>Habit Tasks</> 
            </Link>
            <Link href="/life-domains" className="flex  border-gray-300 items-center gap-1 p-4 border rounded hover:scale-[103%] duration-400 animate_style glassmorphism font-medium text-gray-900 hover:bg-orange-200">
            <ProportionsIcon className="w-5 h-5"/> <>Life Domains</> 
            </Link>
            <Link href="/challenge" className="flex  border-gray-300 items-center gap-1 p-4 border rounded hover:scale-[103%] duration-400 animate_style glassmorphism font-medium text-gray-900 hover:bg-orange-200">
            <SwordsIcon className="w-5 h-5"/>  <>Join a challenge</> 
            </Link>
        </span>
    )
}