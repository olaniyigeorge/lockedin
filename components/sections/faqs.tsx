import React from "react";
import FaqCard from "../faq-card";

const faqs = [
  { 
    question: "How does AI verification work?", 
    answer: "You submit proof of completing a task—such as a photo, video, document, or a link to any of these—and our AI verifies completion." 
  },
  { 
    question: "Is there a free plan?", 
    answer: "Yes! Our free plan includes basic habit tracking. However, upgrading unlocks advanced features to help you stay on track and achieve your goals more effectively." 
  },
  { 
    question: "How do I get an accountability partner?", 
    answer: "You can invite friends or connect with community members through the app to become accountability partners." 
  },
  { 
    question: "Can I get back a lost streak?", 
    answer: "Yes! Depending on your plan, you may have the option to restore a lost streak using streak protection or community support. However, you will need to complete certain tasks to regain your streak and ensure accountability." 
  },
  { 
    question: "What happens if I miss a habit?", 
    answer: "Missing a habit may impact your streak, but you can always get back on track with reminders, accountability support, and habit recovery options." 
  },
  { 
    question: "Do I need to stake tokens to use LockedIn?", 
    answer: "No, staking is optional. It adds an extra layer of commitment, gamification, and rewards for staying consistent." 
  },
  { 
    question: "Can I track multiple habits at once?", 
    answer: "Yes! Depending on your plan and your past commitment, you can track multiple habits and set different accountability rules for each." 
  },
  { 
    question: "How do challenges work?", 
    answer: "Challenges allow you to compete with others or challenge yourself to stay motivated and earn rewards for completing habits." 
  }
];


export function FAQs() {
  return (
    <div className="w-full py-16 bg-white text-center px-2">
      <section id="faqs" className="main">
        <h2 className="text-2xl md:text-3xl black_green_gradient font-black">You Questions, Answered</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
              <FaqCard key={index} {...faq} />
          ))}
        </div>
      </section>
    </div>
  );
}
