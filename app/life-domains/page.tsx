"use client";
import Link from "next/link"
import LifeDomainCard, { iLifeDomain } from "@/components/life-domain-card"
import { useAuthStore } from "@/providers/auth-store-provider";
import { useState, useEffect } from "react";
import { LayoutTemplateIcon, Loader } from "lucide-react";

export default function LifeDomains() {
    const { user } = useAuthStore((state) => state);
    const [lifeDomains, setLifeDomains] = useState<iLifeDomain[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/life-domains?owner=${user!.id}`);
                const data = await response.json();
                setLifeDomains(data.data);
            } catch (error) {
                setError(`Failed to fetch data ${error}`);
                throw new Error(`Failed to fetch data ${error}`);
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
        return <div className="min-h-[500px] flex justify-center items-center">
            <Loader className="w-8 h-8 animate-spin" />
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full  p-2 md:p-4">
            <span className="w-full flex gap-4 justify-center items-center">
                <h1 className="text-2xl md:text-3xl font-bold">Life Domains</h1>
                <>{user ?
                    <Link 
                        className=""
                        href="/life-domains/new"
                    > 
                        <LayoutTemplateIcon className="w-8 h-8 text-green-500"/>
                    </Link>
                :   <Link href="/auth/sign-in" className="light_btn">
                        Sign In
                    </Link>
                }</>
            </span>
            <p className="mt-4 text-gray-600 text-lg md:text-2xl lg:text-3xl text-center">Life domains are areas of your life where you want to build better habits and achieve personal growth.</p>
           

            <section className="w-full my-6 gap-2 grid grid-cols-1 md:grid-cols-3">
                {
                    lifeDomains.length > 0 ? (
                        <>
                            {lifeDomains.map((lfd: iLifeDomain) => (
                                <LifeDomainCard 
                                    key={lfd._id}
                                    {...lfd}
                                />
                            ))}
                        </>
                    ) : (
                        <div className="flex min-h-[300px] gap-3 justify-center items-center border w-screen">
                            <Link href="/onboarding/waitlist" className="flex gap-2 w-fit items-center border hover:border-green-500 glassimorphism p-3">
                                <LayoutTemplateIcon className="w-8 h-8 text-green-500"/>
                                <>Add Habit Task</>
                            </Link>
                        </div>
                    )
                }
            </section>

        </div>
    );
}