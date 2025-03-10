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
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSafeMutation } from "@/axios/query-client";
import { toast } from "react-toastify";
import { AllRoutes } from "@/routes";
import { InlineLoader } from "@/components/InlineLoader";

export const formSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Must be a valid email address.",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/]/, {
        message:
          "Password must contain at least one special character (@#$%^&*()_+-={}[]|\\:;\"'<>,.?/).",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type SignupFormData = z.infer<typeof formSchema>;

export const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // const router = useRouter();

  const { mutate, isPending } = useSafeMutation<
    {
      success: boolean;
      message: "string";
      data: [];
    },
    Error,
    SignupFormData
  >(`${AllRoutes.auth}/signup`, "post", {
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        // router.push(`${AuthRoutes.verify}`)
      }
    },
    onError: (error: any) => {
      console.log(error);
      if (error?.message) toast.error(error?.message);
      if (error?.response?.data?.message) toast.error(error?.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  return (
    <div className="w-full md:w-[50%] md3:w-[50%] xl:w-[30%] flex flex-col bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-center font-semibold text-[min(10vw,28px)] mb-6 text-lockedin-green">
        Sign Up
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <section className="w-full flex flex-col gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="outline-none focus-visible:ring-[1px] focus-visible:ring-lockedin-green bg-white text-grey focus:border-lockedin-green border-[2px] focus-visible:border-none rounded-lg px-2 transition-all duration-300"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="outline-none focus-visible:ring-[1px] focus-visible:ring-lockedin-green bg-white text-grey focus:border-lockedin-green border-[2px] focus-visible:border-none rounded-lg px-2 transition-all duration-300"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John@25"
                        className="outline-none focus-visible:ring-[1px] focus-visible:ring-lockedin-green bg-white text-grey focus:border-lockedin-green border-[2px] focus-visible:border-none rounded-lg px-2 transition-all duration-300"
                        type="password"
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
              className="w-full py-6 text-white rounded-lg bg-lockedin-green hover:bg-lockedin-green-darkGrey transition-all duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <InlineLoader color="white" size="30" textSize="10" />
              ) : (
                "Signup"
              )}
            </Button>

            <p className="text-black text-sm text-center">
              <span>Have an account?</span>
              <Link
                href="/signin"
                className="text-lockedin-green hover:text-black underline transaitio-all duration-300 ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
