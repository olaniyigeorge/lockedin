import React from "react";
import PriceCard from "../price-card";

const plans = [
  { 
    name: "Free", 
    price: 0, 
    features: [
      "Basic habit tracking & management", 
      "Invite accountability partners", 
      "Limited AI verification"
    ] 
  },
  { 
    name: "Basic", 
    price: 4.99, 
    features: [
      "Everything in Free", 
      "Full AI verification access", 
      "Limited notifications & reminders", 
      "Join challenges"
    ] 
  },
  { 
    name: "Pro", 
    price: 9.99, 
    features: [
      "Everything in Basic", 
      "Advanced habit & behavior analytics", 
      "Web3 staking to drive commitment", 
      "Specialized notifications & reminders"
    ] 
  },
];

export function Pricing() {
  return (
    <div className="w-full py-10 bg-green-600  text-center">
      <section id="pricing" className="main py-4 ">
        <h2 className="text-2xl md:text-3xl  text-white font-bricolage font-extrabold">Pricing</h2>
        <div className="mt-6 flex flex-col md:flex-row justify-around gap-8">
          {plans.map((plan, index) => (
            <PriceCard key={index} {...plan} />
          ))}
        </div>
      </section>   
    </div>
  );
}
