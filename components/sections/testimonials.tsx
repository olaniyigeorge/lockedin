"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import {motion} from "framer-motion"

const testimonials = [
  { 
    text: "LockedIn has transformed the way I manage my tasks!", 
    imageSrc: "/globe.svg", 
    name: "Tinabel Etta", 
    username: "@tinabel" 
  },
  { 
    text: "LockedIn kept me accountable like never before!", 
    imageSrc: "/globe.svg",  
    name: "John Doe", 
    username: "@johndoe" 
  },
  { 
    text: "I love the AI verification—it's a game-changer!", 
    imageSrc: "/globe.svg",  
    name: "Jane Smith", 
    username: "@janesmith" 
  },
  { 
    text: "The user interface is so intuitive and easy to use.", 
    imageSrc: "/globe.svg",  
    name: "Ewoquo Joseph", 
    username: "@ewoquojoseph" 
  },
  { 
    text: "LockedIn helps me stay focused and productive every day.", 
    imageSrc: "/globe.svg",  
    name: "Victoria Aguh", 
    username: "@victoriaaguh" 
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3,6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: 
  { className?: string; testimonials: typeof testimonials; duration?:  number; }) => (
  <div className= {twMerge ("", props.className)}>
    <motion.div className="flex flex-col gap-6 pb-6 - "
        animate={{
          translateY: "-50%"
        }}
        transition={{
          repeat:Infinity,
          ease:"linear",
          repeatType:"loop",
          duration: props.duration || 10,
        }}
    >
            
      {[...new Array(2).fill(0).map((_, index) =>
      <React.Fragment key={index}>
          {props.testimonials.map(({text, imageSrc, name, username }, index) => (
        <div key={index} className="p-10 border border-[#f1f1f1]  rounded-3xl shadow-[0_7px_14px_#FED7AA] max-w-xs w-full">
            <div>{text}</div>
            <div className="flex items-center gap-2 mt-5">
              <Image 
                src={imageSrc} 
                width={40} 
                height={40} 
                alt={name} 
                className="h-8 w-8 rounded-full"
              />
            
              <div className="flex flex-col">
                <div className="font-medium tracking-tight leading-5">{name}</div>
                <div className="leading-5 tracking-tight">{username}</div>
              </div>
          </div>  
        </div>
      ))}
      </React.Fragment>
      )]}
      
    </motion.div>
  </div>
)

export default function Testimonials () {
  return (
    <section className="w-full bg-white">
        <div className="main flex flex-col justify-center items-center py-10">
            <div className="text-center w-full flex flex-col justify-center items-center">
              <div className="tag">Testimonials</div>
              <h2 className="section-title md:text-5xl mt-5">What our users say</h2>
              <p className="section-description mt-5">
                From AI-powered accountability to a thriving community of habit builders, 
                our platform makes staying consistent easier, rewarding, and fun. 
                Build habits, reach goals, and celebrate progress together—we are Locked In!
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
              
              <TestimonialsColumn testimonials={firstColumn} duration={15}/>
              <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19}/>
              <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
              
            </div>
        </div>
    </section>
  );
};