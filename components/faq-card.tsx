"use client";
import React, { useState } from 'react';

interface FaqCardProps {
    question: string;
    answer: string;
}

export default function FaqCard(props: FaqCardProps) {
    const { question, answer } = { ...props };
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full h-fit mb-6 p-4 bg-gray-100 rounded-lg">
            <h3 onClick={toggleAnswer} style={{ cursor: 'pointer' }} className="font-semibold">
                {question}
            </h3>
            {isOpen && <p className="text-gray-600 mt-2">{answer}</p>}
        </div>
    );
};

