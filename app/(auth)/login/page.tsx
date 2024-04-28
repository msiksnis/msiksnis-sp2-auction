"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import loginAction from "@/app/actions/loginAction";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

export default function LoginPage() {
  const [error, formAction] = useFormState(loginAction, undefined);

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
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
              />
              <Button
                variant="link"
                className="absolute top-7 right-0 p-3 flex items-center text-xs leading-5"
              >
                Show
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-700 hover:text-slate-900">
              <div className="flex items-center space-x-2 cursor-pointer">
                <input
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 accent-black border-black rounded-full focus:ring-black cursor-pointer"
                />
                <label htmlFor="remember-me" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="cursor-pointer">Forgot password?</div>
            </div>

            <Button size="full">Sign In</Button>
            {error && <p className="text-red-500 py-1">{error}</p>}
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
