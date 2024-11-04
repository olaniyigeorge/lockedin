"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FooterControls() {
    const pathname = usePathname();

    // Function to determine if the current pathname starts with the link
    const isActive = (link: string) => pathname.startsWith(link);

    return (
        <section className="w-full z-10 grid grid-cols-5 items-center gap-3 justify-between sticky bottom-0 right-0 p-3 md:px-40">
            <Link
                href="/life-domains"
                className={`${isActive('/life-domains') ? 'active-footer-controls-btn' : 'footer-controls-btn'}`}
            >
                Life Domains
            </Link>
            <Link
                href="/habit-tasks"
                className={`${isActive('/habit-tasks') ? 'active-footer-controls-btn' : 'footer-controls-btn'}`}
            >
                Habit Tasks
            </Link>
            <Link
                href="/explore"
                className={`${isActive('/explore') ? 'active-footer-controls-btn' : 'footer-controls-btn'}`}
            >
                Explore
            </Link>
            <Link
                href="/scoreboard"
                className={`${isActive('/scoreboard') ? 'active-footer-controls-btn' : 'footer-controls-btn'}`}
            >
                Scoreboard
            </Link>
            <Link
                href="/profile"
                className={`${isActive('/profile') ? 'active-footer-controls-btn' : 'footer-controls-btn'}`}
            >
                Profile
            </Link>
        </section>
    );
}
