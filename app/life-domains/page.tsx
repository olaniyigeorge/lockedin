"use client";
import Link from "next/link"
import LifeDomainCard, { iLifeDomain } from "@/components/life-domain-card"
import { useAuthStore } from "@/providers/auth-store-provider";
import { useState, useEffect } from "react";

export default function LifeDomains() {
    const { user } = useAuthStore((state) => state);
    const [lifeDomains, setLifeDomains] = useState<iLifeDomain[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch data and update state variables here
        async function fetchData() {
            try {
                const response = await fetch(`/api/life-domains?owner=${user!.id}`);
                const data = await response.json();
                console.log(data);
                setLifeDomains(data.data);
            } catch (error) {
                setError(`Failed to fetch data ${error}`);
            } finally {
                setLoading(false);
            }
        }
        if (user) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full">
            <span className="w-full flex items-center justify-between">
                <>Define tags for the areas where you want to build better habits..</>
                <>{user ?
                    <Link 
                        className="border border-black hover:border-gray-900 p-1 rounded-md"
                        href="/life-domains/new"
                    > 
                        Add Domain
                    </Link>
                : <>Login</>
                }</>
            </span>
            <section className="w-full my-4 gap-2 grid grid-cols-1 md:grid-cols-3">
                {lifeDomains.map((lfd: iLifeDomain) => (
                    <LifeDomainCard 
                        key={lfd._id}
                        {...lfd}
                    />
                ))}
            </section>
        </div>
    );
}