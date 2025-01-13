"use client";

import { useState } from 'react';

export interface Feature {
    added_at: Date;
    title: string;
    description: string;
    icon: string;
    status: "dev" | "staging" | "requested" | "scheduled" | "shipped" 
}

export interface FeatureSliderProps {
    features: Feature[];
    className?: string;
}

// TODO: Animate Feature in onclick

export default function FeatureSlider({ features, className }: FeatureSliderProps) {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
    const activeFeature = features[activeFeatureIndex];

    return (
        <div id="features" className={`flex flex-col items-center ${className} max-w-[95%] md:max-w-[70%] w-full `}>
            <div className="w-full py-5 md:py-10 flex items-center justify-between gap-3 bg-orange-500 bg-white/5 shadow-[inset_10px_-80px_94px_0_rgb(199,199,199,0.1)] backdrop-blur-lg p-5 rounded-lg p-2 bg-opacity-10">
                <div className="w-1/2 p-4 flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-center">{activeFeature.title}</h2>
                    <p className="text-2xl text-balance font-nunito mt-2">{activeFeature.description}</p>
                    <span className="text-xs p-2 border rounded-lg">{activeFeature.status}</span>
                </div>
                <div className="w-1/2 p-4 flex max-h-[220px] overflow-y-auto flex-col items-center font-nunito">
                    <ul>
                        {features
                            .sort((a, b) => new Date(a.added_at).getTime() - new Date(b.added_at).getTime())
                            .map((feature, index) => (
                                <li
                                    key={index}
                                    className={`hover:scale-[105%] transition-all ease-in-out duration-300 cursor-pointer p-2 ${index === activeFeatureIndex ? 'orange_gradient font-bold' : ''}`}
                                    onClick={() => setActiveFeatureIndex(index)}
                                >
                                    {"------"} {feature.title} 
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
