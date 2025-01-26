    "use client";

    import { features } from 'process';
    import { useState } from 'react';

    export interface Feature {
        added_at: Date;
        title: string;
        description: string;
        icon: string;
        status: "dev" | "staging" | "requested" | "scheduled" | "shipped" 
    }

    export interface FeatureSliderProps {
        className?: string;
    }

    // TODO: Animate Feature in onclick

    export default function FeatureSliderSection({ className }: FeatureSliderProps) {
        const features: Feature[] = appFeatures
        const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
        const activeFeature = features[activeFeatureIndex];

        return (
            <div id="features" className={`flex flex-col items-center ${className} max-w-[95%] md:max-w-[70%] w-full my-10 px-2`}>
                <div className="w-full py-5 md:py-10 flex flex-col md:flex-row items-center justify-between gap-3 border-2 border-gray-600 glassmorphism bg-white/5 shadow-[inset_10px_-80px_94px_0_rgb(199,199,199,0.1)] backdrop-blur-lg p-5 rounded-lg bg-opacity-10">
                    <div className="w-full md:max-w-[60%]  p-4 flex flex-col items-center">
                        <h2 className="text-2xl md:text-4xl font-bold text-center">{activeFeature.title}</h2>
                        <span className="text-xs p-1 border rounded-full">{activeFeature.status}</span>
                        <p className="text-2xl w-full text-balance mt-2">{activeFeature.description}</p>
                    
                    </div>
                    <div className="w-full  p-4 flex max-h-[220px] overflow-y-auto flex-col justify-center items-center">
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





    // Features for the app
    const appFeatures: Feature[] = [
        {
        added_at: new Date('2023-01-01T10:00:00Z'),
        title: "Join Waitlist",
        description: "Waitlist form hooked to db.",
        icon: "icon-one",
        status: "staging"
        },
        {
        added_at: new Date('2023-02-15T14:30:00Z'),
        title: "Authentication",
        description: "Sign up and sign in",
        icon: "icon-two",
        status: "staging"
        },
        {
        added_at: new Date('2023-02-15T14:30:00Z'),
        title: "Accountability Partnership(Challenge)",
        description: "Allow users setup tasks, stake a wager to be redeemed little by little for every entry made on th task and invite friends to hold you accountable and join the challenge.",
        icon: "icon-two",
        status: "dev"
        },
        {
        added_at: new Date('2023-03-30T08:45:00Z'),
        title: "Habit Tasks Management",
        description: "Create habit tasks with the ability to update its visibility status and extent its end time on the last day",
        icon: "icon-three",
        status: "scheduled"
        },
    ];