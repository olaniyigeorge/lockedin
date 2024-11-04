"use client"
import { useEffect, useState } from 'react';

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
        <div className="border border-gray-300 p-4 rounded-md bg-white shadow-md">
            <h1 className="text-2xl font-semibold">{lifeDomain.name}</h1>
            <p className="mt-2 text-gray-700">{lifeDomain.description}</p>
            <div className="mt-4 text-sm text-gray-500">
                <span>Life Domain ID: {lifeDomain._id}</span>
            </div>
        </div>
    );
}
