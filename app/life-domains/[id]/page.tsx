"use client"
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';


interface iLifeDomain {
    _id: string;
    name: string;
    description: string;
}

export default function LifeDomainPage({ params }: { params: { id: string } }) {
    const [lifeDomain, setLifeDomain] = useState<iLifeDomain | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLifeDomain = async () => {
            try {
                const response = await fetch(`/api/lockedin/life-domains?id=${params.id}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    setLifeDomain(data);
                } else {
                    setError(`Error: ${response.status}`);
                }
            } catch (err) {
                console.log(err);
                setError('An error occurred while fetching the life domain.');
            }
        };

        fetchLifeDomain();
    }, [params.id]);

    if (error) {
        notFound();
        return (
            <div className="text-red-500">
                <span>{error}</span>
                <div>This Life Domain {params.id}</div>
            </div>
        );
    }

    if (!lifeDomain) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 w-full h-full rounded-md bg-white shadow-md">
            <span className='w-full flex items-center justify-between'>
                <h1 className="text-2xl md:text-3xl font-semibold">{lifeDomain.name}</h1>
                
                <Link className="shadow bg-orange-200 p-2 rounded-3xl text-sm" href={`/life-domains/${params.id}/edit`}>
                    Edit
                </Link> 
            </span>

            <p className="mt-2 text-lg md:text-xl text-gray-700">{lifeDomain.description}</p>

        </div>
    );
}
