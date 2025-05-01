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
import { useRouter } from "next/navigation";
import { InlineLoader } from "@/components/InlineLoader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { useSafeMutation } from "@/axios/query-client";
import { toast } from "react-toastify";
import { ALLROUTES } from "@/routes";
import { AuthResponse } from "@/interface";
import { useState } from "react";
// import { useState } from "react";
// import { useGlobalState } from "@/globalStore";

export const formSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long." })
      .max(40, { message: "Password must not exceed 40 characters." })
      .refine(
        (password) =>
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]/.test(password),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of these symbols (!@#$%^&*()_-+=[]{};:'\",.<>?/\\|`~).",
        }
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type ResetPasswordFormData = z.infer<typeof formSchema>;

export const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const router = useRouter();
  // const { setLoggedInUser } = useGlobalState();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // mutate,
  const { isPending } = useSafeMutation<
    AuthResponse,
    Error,
    ResetPasswordFormData
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
    router.push("/signin");

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
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-lockedin-green">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Pass96@"
                          type={showPassword ? "text" : "password"}
                          className="outline-none focus-visible:ring-[1px] focus-visible:ring-lockedin-orange bg-white text-grey focus:border-lockedin-green border-[2px] focus-visible:border-none rounded-lg px-2 transition-all duration-300 hover:border-lockedin-green"
                          {...field}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-3 top-1 flex items-center cursor-pointer duration-500 hover:text-lockedin-orange"
                        >
                          {showPassword ? (
                            <BsFillEyeFill size={16} />
                          ) : (
                            <BsFillEyeSlashFill size={16} />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lockedin-green">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="P@ss96"
                        className="outline-none focus-visible:ring-[1px] focus-visible:ring-lockedin-orange bg-white text-grey focus:border-lockedin-green border-[2px] focus-visible:border-none rounded-lg px-2 transition-all duration-300 hover:border-lockedin-green"
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
              className="w-full py-6 text-white rounded-lg bg-lockedin-green hover:bg-lockedin-orange cursor-pointer transition-all duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <InlineLoader color="white" size="30" textSize="10" />
              ) : (
                "Save Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
