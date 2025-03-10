"use client";

import { useSafeMutation } from "@/axios/query-client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useGlobalState } from "@/globalStore";
import { useBodyScrollLock } from "@/hooks/use-body-lock";
// import { useRouter } from "next/navigation";
import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { InlineLoader } from "../InlineLoader";
import useClickOutside from "@/hooks/use-click-outside";
import { WaitlistEntryInput, WaitlistResponse } from "@/interface";
import { AllRoutes } from "@/routes";

const waitlistFormSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Full name must be at least 6 characters." })
    .max(50, { message: "Full name must not exceed 50 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(3, { message: "Email must be at least 12 characters." })
    .max(50, { message: "Email must not exceed 50 characters." }),
  discovery_location: z.string(),
});

export const JoinWaitlistModal: React.FC = () => {
  const { isWaitlistModalOpen, setIsWaitlistModalOpen } = useGlobalState();
  const modalRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof waitlistFormSchema>>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      discovery_location: "",
    },
  });

  useBodyScrollLock(isWaitlistModalOpen);

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => {
    form.reset();
    setIsWaitlistModalOpen(false);
  });

  const { mutate: joinWaitlist, isPending } = useSafeMutation<
    WaitlistResponse,
    Error,
    WaitlistEntryInput
  >(`${AllRoutes.waitlist}`, "post", {
    onSuccess: (data) => {
      console.log(data);
      if (data.entry._id && data.message.includes("Successfully")) {
        toast.success(data.message);
      }
      // router.refresh();
    },
    onError: (error: any) => {
      console.log(error);

      if (error.message) {
        toast.error(error?.message);
      }
      if (typeof error === "object" && error?.errorMessage) {
        toast.error(error?.errorMessage);
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof waitlistFormSchema>) => {
    console.log(data);
    joinWaitlist(data);
  };

  return (
    <>
      {isWaitlistModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80">
          <div
            ref={modalRef}
            className=" bg-[#fcfcfc] rounded-lg shadow-lg w-[90%] max-w-md p-6 relative max-h-[90vh] overflow-y-auto h-fit"
          >
            <MdClose
              onClick={() => {
                form.reset();
                setIsWaitlistModalOpen(false);
              }}
              className="cursor-pointer hover:text-lockedin-orange absolute top-3 right-3 text-[#626262] hover:text-eweko_green"
              size={21}
            />

            <div className="flex flex-col gap-2 mb-6">
              <h3 className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent text-[min(10vw,18px)]">
                Unlock Your Best Self with LockedIn! 🚀
              </h3>
              <p className="text-[15px] text-gray-700">
                Join the waitlist now and be the first to experience a
                game-changing way to stay on track. Your future self will thank
                you! 💪✨
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="border border-lockedin-green outline-none focus-visible:outline-none focus-within:ring-lockedin-orange focus-within:border-lockedin-orange focus-visible:ring-[1px] focus-visible:ring-q2win bg-white text-black focus:border-q2win focus-visible:border-none rounded-lg px-2 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@gmail.com"
                          {...field}
                          className="border border-lockedin-green outline-none focus-visible:outline-none focus-within:ring-lockedin-orange focus-within:border-lockedin-orange focus-visible:ring-[1px] focus-visible:ring-q2win bg-white text-black focus:border-q2win focus-visible:border-none rounded-lg px-2 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discovery_location"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>How did you hear about us?</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border border-lockedin-green outline-none focus-visible:outline-none focus-within:ring-lockedin-orange focus-within:border-lockedin-orange focus-visible:ring-[1px] focus-visible:ring-q2win text-black focus:border-q2win focus-visible:border-none rounded-lg px-2 transition-all duration-300">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-lockedin-green border border-gray-300 rounded-lg shadow-md">
                            <SelectItem
                              value="web"
                              className="focus:bg-lockedin-orange focus:text-white px-3 py-2"
                            >
                              Google Search
                            </SelectItem>
                            <SelectItem
                              value="twitter"
                              className="focus:bg-lockedin-orange focus:text-white px-3 py-2"
                            >
                              Twitter
                            </SelectItem>

                            <SelectItem
                              value="family_and_friends"
                              className="focus:bg-lockedin-orange focus:text-white px-3 py-2"
                            >
                              A Friend or Colleague
                            </SelectItem>
                            <SelectItem
                              value="telegram_bot"
                              className="focus:bg-lockedin-orange focus:text-white px-3 py-2"
                            >
                              Telegram Bot
                            </SelectItem>
                            <SelectItem
                              value="linkedin"
                              className="focus:bg-lockedin-orange focus:text-white px-3 py-2"
                            >
                              LinkedIn
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="cursor-pointer rounded-full px-8 py-5 duration-500 transition bg-lockedin-green text-white hover:bg-lockedin-orange hover:font-bold hover:border-none leading-none"
                >
                  {isPending ? (
                    <InlineLoader color="white" size="30" textSize="10" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
