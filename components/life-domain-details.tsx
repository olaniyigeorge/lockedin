"use client";

import { iLifeDomain } from './life-domain-card';

export default function LifeDomainDetails(lifeDomain: iLifeDomain) {


    return (
        <div className="border border-gray-300 p-4 rounded-md bg-white shadow-md">
        <h1 className="text-2xl font-semibold">{lifeDomain.name}</h1>
        <p className="mt-2 text-gray-700">{lifeDomain.description}</p>
        <div className="mt-4 text-sm text-gray-500">
            <span className='hidden'>Life Domain ID: {lifeDomain._id}</span>
        </div>
    </div>
    );
}


