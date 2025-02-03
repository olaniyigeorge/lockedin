import { ListIcon, ProportionsIcon, SwordsIcon } from "lucide-react";
import Link from "next/link";

export default function ActionBtns() {


    return (
        <span className="w-full flex flex-col md:flex-row justify-center gap-4 md:gap-6 my-10 p-2 md:p-4">
            <Link href="/habit-tasks" className="action-btn">
                <ListIcon className="w-5 h-5"/> <>Habit Tasks</> 
            </Link>
            <Link href="/life-domains" className="action-btn">
            <ProportionsIcon className="w-5 h-5"/> <>Life Domains</> 
            </Link>
            <Link href="/challenge" className="action-btn">
            <SwordsIcon className="w-5 h-5"/>  <>Join a challenge</> 
            </Link>
        </span>
    )
}