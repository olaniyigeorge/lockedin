"use client";

import { useState } from 'react';

export interface Feature {
    title: string;
    description: string;
    icon: string;
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
        <div className={`flex flex-col items-center ${className} max-w-[95%] md:max-w-[70%] w-full `}>
            <div className="w-full py-5 md:py-10 flex items-center justify-between gap-3 bg-orange-500 bg-white/5 shadow-[inset_10px_-80px_94px_0_rgb(199,199,199,0.1)] backdrop-blur-lg p-5 rounded-lg p-2 bg-opacity-10">
                <div className="w-1/2 p-4 flex flex-col items-center">
                    <h2 className="text-4xl font-bold">{activeFeature.title}</h2>
                    <p className="text-2xl text-center font-nunito">{activeFeature.description}</p>
                </div>
                <div className="w-1/2 p-4 flex flex-col items-center font-nunito">
                    <ul>
                        {features.map((feature, index) => (
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
