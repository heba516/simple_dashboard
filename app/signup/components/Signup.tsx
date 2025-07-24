"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import clsx from "clsx";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import Link from "next/link";

const formSchema = z
  .object({
    displayName: z.string().min(2, "Name is required"),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface IInput {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: string;
}

const inputs: IInput[] = [
  {
    name: "displayName",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "Enter your email address",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
    type: "password",
  },
];

export const SignupForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true);
      await register(data.displayName, data.email, data.password);
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 lg:w-1/2 mx-auto space-y-10 px-4 h-screen place-content-center"
      >
        <h1 className="font-bold text-[36px] text-blue-600 leading-9 mb-6 text-center">
          Sign Up
        </h1>
        {inputs.map((input, index) => (
          <FormField
            key={index}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-base text-blue-600">
                  {input.label}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={
                        input.type === "password" && passwordVisible
                          ? "text"
                          : input.type
                      }
                      className={clsx(
                        form.formState.errors[input.name] && "shadow-error"
                      )}
                      placeholder={input.placeholder}
                      {...field}
                    />
                    {input.type === "password" && (
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 focus:outline-none"
                      >
                        {passwordVisible ? <EyeClosedIcon /> : <EyeIcon />}
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={loading}
          variant={"default"}
          className="w-full p-6 text-xl leading-4 font-semibold rounded-lg bg-blue-600 lg:mt-4 hover:bg-blue-700"
          type="submit"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" href={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};
