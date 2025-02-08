"use client";

import { iLifeDomain } from './life-domain-card';

export default function LifeDomainDetails(lifeDomain: iLifeDomain) {

    // TODO Add a {add habit task} button if owner is the current auth'd user


    return (
        <div className="w-full md:w-1/2 border-gray-300 p-4 my-4 mx-2 rounded-md glassimorphism shadow-md">
        <h1 className="text-2xl font-bold text-center">{lifeDomain.name}</h1>
        <p className="mt-2 text-gray-700 text-pretty">{lifeDomain.description}</p>

    </div>
    );
}


