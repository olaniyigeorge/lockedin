"use client";
import React from "react";
import Image from "next/image"
import {motion} from 'framer-motion'

export function SocialProof() {
  return (
    <div className="w-full [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
      <section 
        id="social-proofs" 
        className="border-y w-full flex bg-white flex-col justify-center items-center  text-center"
      >
      
        <h2 hidden className="text-2xl font-medium py-1">Trusted by Thousands</h2>
        <motion.div className='w-full flex justify-around gap-24 py-6 flex-none pr-14' animate={{
                  translateX: "-20%"
                }}
                transition={{
                  duration: 8  ,
                  repeat:Infinity,
                  ease:'linear',
                  repeatType:"reverse",
                }}  
        >
          {/* Add brand logos here */}
          
          <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />
          <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />
          <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />
          <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />
                    <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />
          <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />
                    <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />
          <Image
            src="/globe.svg"
            width={20}
            height={20}
            className="object-cotain"
            alt=""
          />

        </motion.div>
      
      </section>
    </div>
  );
}
