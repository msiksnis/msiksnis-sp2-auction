"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

import registerNewUserAction from "@/app/actions/registerNewUserAction";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <Button size="full" type="submit" disabled>
        <LoaderCircle className="size-4 mr-2 animate-spin" />
        Registering in...
      </Button>
    );
  }

  return (
    <Button size="full" type="submit">
      Sign up
    </Button>
  );
}

const initialState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  state: {
    success: false,
    error: false,
    message: null,
  },
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useFormState(registerNewUserAction, initialState);

  useEffect(() => {
    if (state.success) {
      redirect("/login");
    }

    if (state.error) {
      toast.error(state.message);
    }
  }, [state.success, state.error]);

  console.log("error:", state.error);
  console.log("success:", state.success);
  console.log("message:", state.meassage);

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex flex-col justify-center px-4 lg:px-8 text-slate-900 mt-20">
        <h1 className="mb-6 text-center text-xl md:text-2xl tracking-tight">
          Sign up for a new account
        </h1>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4 md:space-y-6" action={formAction}>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              aria-label="Name"
              className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
            <Input
              id="email"
              name="email"
              type="email"
              aria-label="Email address"
              autoComplete="email"
              required
              placeholder="Email address"
              className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                aria-label="Password"
                autoComplete="new-password"
                required
                placeholder="Password"
              />
              <Button
                type="button"
                variant="link"
                aria-label="Show password"
                onClick={toggleShowPassword}
                className="absolute top-7 right-0 px-3 flex items-center text-xs leading-5 focus-visible:outline -outline-offset-4 outline-black"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>

            <SubmitButton />
            {state.error && <p className="text-red-500">{state.message}</p>}
          </form>
          <div className="text-sm mt-4 text-center">
            <Link
              href="/login"
              className="text-slate-700 hover:text-slate-900 hover:underline underline-offset-4 transition-all duration-200 ease-in-out"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
