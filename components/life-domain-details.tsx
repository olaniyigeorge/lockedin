"use client";

import { iLifeDomain } from './life-domain-card';

export default function LifeDomainDetails(lifeDomain: iLifeDomain) {

    // TODO Add a {add habit task} button if owner is the current auth'd user


    return (
        <div className="border border-gray-300 p-4 my-4 mx-2 rounded-md bg-white shadow-md">
        <h1 className="text-2xl font-semibold">{lifeDomain.name}</h1>
        <p className="mt-2 text-gray-700">{lifeDomain.description}</p>
        <div className="mt-4 text-sm text-gray-500">
            <span className='hidden'>Life Domain ID: {lifeDomain._id}</span>
        </div>
    </div>
    );
}


