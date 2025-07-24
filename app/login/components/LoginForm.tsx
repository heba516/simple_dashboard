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
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setUser } from "@/store/userSlice";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 characters." }),
});

interface IInput {
  name: "email" | "password";
  label: string;
  placeholder: string;
  type: string;
}

const inputs: IInput[] = [
  {
    name: "email",
    label: "Email address",
    placeholder: "enter your email address",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "enter your password",
    type: "password",
  },
];

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const dispatch = useDispatch<AppDispatch>();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const user = await login(data.email, data.password);
      dispatch(
        setUser({ name: user.user.displayName, email: user.user.email })
      );

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
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
          Login
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
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link className="text-blue-600 hover:underline" href={"/signup"}>
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};
