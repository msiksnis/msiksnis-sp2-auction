"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

import loginAction from "@/app/actions/loginAction";
import Input from "@/components/Input";

export default function LoginPage() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <>
      <div className="flex flex-col justify-center px-4 lg:px-8 text-slate-900 min-h-screen">
        <h1 className="mb-10 text-center text-xl md:text-2xl tracking-tight">
          Sign in to your account
        </h1>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4 md:space-y-6" action={formAction}>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <div className="mt-1 md:mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
              </div>

              <div className="mt-1 md:mt-2 relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  id="toggPasswordVisibility"
                  className="absolute inset-y-0 right-0 p-3 flex items-center text-xs leading-5"
                >
                  Show
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-700 hover:text-slate-900">
              <div className="flex items-center space-x-2 cursor-pointer">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-yellow-400 border-black rounded-full focus:ring-black cursor-pointer"
                />
                <label htmlFor="remember-me" className="cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="group relative overflow-hidden flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow transition duration-700"
            >
              <span className="z-10 relative">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-accent-yellow to-yellow-200"></div>
              <div className="hover-target absolute inset-0 bg-gradient-to-r from-accent-yellow via-yellow-400 to-accent-yellow opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </button>
            {error && <p className="text-red-500 py-1">{error}</p>}
          </form>
          <div className="text-sm mt-4 text-center">
            <Link
              href="/signup"
              className="text-slate-700 hover:text-slate-900 hover:underline underline-offset-4 transition-all duration-200 ease-in-out"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
