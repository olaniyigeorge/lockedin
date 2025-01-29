"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

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
  discovery_location: z
    .string()
});


export const WaitlistForm = () => {
  const form = useForm<z.infer<typeof waitlistFormSchema>>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      discovery_location: "web",
    },
  });

  const onSubmit = async (data: z.infer<typeof waitlistFormSchema>) => {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      toast.success(res.message);
      form.reset();
    } else {
      toast.error(res.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  className="border border-green-600 outline-none focus-visible:outline-none focus-visible:ring-0 focus-within:ring-inherit focus-within:border-orange-500 bg-transparent"
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
                  className="border border-green-600 outline-none focus-visible:outline-none focus-visible:ring-0 focus-within:ring-inherit focus-within:border-orange-500 bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-full px-12 py-6 text-lg duration-500 transition bg-green-600 text-white hover:bg-orange-500 hover:font-bold hover:border-none leading-none"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
