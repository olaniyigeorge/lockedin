import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export const Faqs = () => {
  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center py-16 md:py-28">
      <div className="w-[90%] md:w-[70%] mx-auto flex flex-col justify-center items-center gap-8">
        <h2 className="text-[min(10vw,28px)] font-bold text-lockedin-green">
          FAQs
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full flex gap-6 items-center justify-center flex-wrap"
        >
          <AccordionItem
            value="item-1"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>Is there a free plan?</AccordionTrigger>
            <AccordionContent>
              Yes! Our free plan includes basic habit tracking. However,
              upgrading unlocks advanced features to help you stay on track and
              achieve your goals more effectively.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>How does AI verification work?</AccordionTrigger>
            <AccordionContent>
              You submit proof of completing a task—such as a photo, video,
              document, or a link to any of these—and our AI verifies
              completion.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>What happens if I miss a habit?</AccordionTrigger>
            <AccordionContent>
              Missing a habit may impact your streak, but you can always get
              back on track with reminders, accountability support, and habit
              recovery options.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>Can I get back a lost streak?</AccordionTrigger>
            <AccordionContent>
              Yes! Depending on your plan, you may have the option to restore a
              lost streak using streak protection or community support. However,
              you will need to complete certain tasks to regain your streak and
              ensure accountability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>
              How do I get an accountability partner?
            </AccordionTrigger>
            <AccordionContent>
              You can invite friends or connect with community members through
              the app to become accountability partners.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-6"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>
              Do I need to stake tokens to use LockedIn?
            </AccordionTrigger>
            <AccordionContent>
              No, staking is optional. It adds an extra layer of commitment,
              gamification, and rewards for staying consistent.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-7"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>
              Can I track multiple habits at once?
            </AccordionTrigger>
            <AccordionContent>
              Yes! Depending on your plan and your past commitment, you can
              track multiple habits and set different accountability rules for
              each.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-8"
            className="w-full md:w-[47%] md3:w-fit bg-lockedin-green rounded-3xl px-6 text-white"
          >
            <AccordionTrigger>How do challenges work?</AccordionTrigger>
            <AccordionContent>
              Challenges allow you to compete with others or challenge yourself
              to stay motivated and earn rewards for completing habits.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
