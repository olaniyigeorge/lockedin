"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
import { InlineLoader } from "@/components/InlineLoader";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSafeMutation } from "@/axios/query-client";
import { toast } from "react-toastify";
import { ALLROUTES } from "@/routes";
import { AuthResponse } from "@/interface";
import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useGlobalState } from "@/globalStore";

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(12, { message: "Email must be at least 12 characters long." })
    .max(60, { message: "Email must not exceed 60 characters." })
    .refine((email) => email.includes(".com"), {
      message: "Email must contain '.com'.",
    }),
  first_name: z
    .string()
    .min(3, { message: "Email must be at least 3 characters long." })
    .max(60, { message: "Email must not exceed 60 characters." }),
});

type ForgotPasswordFormData = z.infer<typeof formSchema>;

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
    },
  });

  const router = useRouter();
  // const { setLoggedInUser } = useGlobalState();

  // mutate,
  const { isPending } = useSafeMutation<
    AuthResponse,
    Error,
    ForgotPasswordFormData
  >(`${ALLROUTES.auth}/signin`, "post", {
    onSuccess: (data) => {
      if (data?.message) {
        // setLoggedInUser(data?.user);
        toast.success(data.message);
        // router.push(`/`);
      }
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.message) toast.error(error?.message);
      if (error?.errorMessage) toast.error(error?.errorMessage);
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    router.push("/reset-password")
    // mutate(data);
  };

  return (
    <div className="w-[90%] sm:w-[80%] sm2:w-[70%] sm3:w-[60%] md:w-[50%] md3:w-[40%] xl:w-[30%] 2xl:w-[25%] flex flex-col bg-white px-6 py-8 rounded-xl shadow-md">
      {/* <h1 className="text-center font-semibold text-[min(10vw,28px)] mb-6 text-lockedin-green">
        Sign Up
      </h1> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <section className="w-full flex flex-col gap-6">
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lockedin-green">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="John@doe.com"
                        className="outline-none focus-visible:ring-[1px] focus-visible:ring-lockedin-orange bg-white text-grey focus:border-lockedin-green border-[2px] focus-visible:border-none rounded-lg px-2 transition-all duration-300 hover:border-lockedin-green"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lockedin-green">Firstname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Onimisea"
                        className="outline-none focus-visible:ring-[1px] focus-visible:ring-lockedin-orange bg-white text-grey focus:border-lockedin-green border-[2px] focus-visible:border-none rounded-lg px-2 transition-all duration-300 hover:border-lockedin-green"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full py-6 text-white rounded-lg bg-lockedin-green hover:bg-lockedin-orange cursor-pointer transition-all duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <InlineLoader color="white" size="30" textSize="10" />
              ) : (
                "Reset Password"
              )}
            </Button>

            <p className="text-black text-sm text-center">
              <span>Didn&apos;t receive it?</span>
              <Button
                variant="ghost"
                onClick={() => alert("Resending password reset email...")}
                className="text-lockedin-orange hover:text-lockedin-green underline transaition-all duration-300 ml-1 cursor-pointer p-0"
              >
                Resend
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
