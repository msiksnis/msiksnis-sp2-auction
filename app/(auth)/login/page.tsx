"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import loginAction from "@/app/actions/loginAction";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

function SubmitButton() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <Button size="full" type="submit" disabled>
        <LoaderCircle className="size-4 mr-2 animate-spin" />
        Signing in...
      </Button>
    );
  }

  return (
    <Button size="full" type="submit">
      Sign in
    </Button>
  );
}

const initialState = {
  email: "",
  password: "",
  message: "",
  state: {
    success: false,
    error: false,
  },
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useFormState(loginAction, initialState);

  // const isLoggedIn = state.success;

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     redirect("/");
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.message);
    }
  }, [state.error, state.message]);

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex flex-col justify-center mt-20 px-4 lg:px-8">
        <h1 className="mb-6 text-center text-xl md:text-2xl tracking-tight">
          Sign in to your account
        </h1>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4 md:space-y-6" action={formAction}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
              />
              <Button
                type="button"
                variant="link"
                onClick={toggleShowPassword}
                className="absolute top-7 right-0 p-3 flex items-center text-xs leading-5 focus-visible:outline -outline-offset-4 outline-black"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-700 hover:text-slate-900">
              <div className="flex items-center space-x-2 cursor-pointer">
                <input
                  name="remember-me"
                  type="checkbox"
                  className="size-4 outline-black accent-black cursor-pointer"
                />
                <label htmlFor="remember-me" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="cursor-pointer">Forgot password?</div>
            </div>

            <SubmitButton />
          </form>
          <div className="text-sm mt-4 text-center">
            <Link
              href="/signup"
              className="text-slate-700 hover:text-slate-900 hover:underline underline-offset-4"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
