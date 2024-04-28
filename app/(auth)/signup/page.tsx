"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import registerNewUserAction from "@/app/actions/registerNewUserAction";
import Input from "@/components/Input";

export default function SignUpPage() {
  const [error, formData] = useFormState(registerNewUserAction, undefined);

  return (
    <>
      <div className="flex flex-col justify-center px-4 lg:px-8 text-slate-900 min-h-screen">
        <h1 className="mb-10 text-center text-xl md:text-2xl tracking-tight">
          Sign Up for a new account
        </h1>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4 md:space-y-6" action={formData}>
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <div className="mt-1 md:mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  aria-label="Name"
                  className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <div className="mt-1 md:mt-2">
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
                  aria-label="Password"
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  aria-label="Show password"
                  id="togglePasswordVisibility"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-xs leading-5"
                >
                  Show
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Repeat password
                </label>
                <span id="passwordMatchIndicator" className="hidden">
                  <img
                    src="/assets/icons/check-mark.svg"
                    alt="Check mark"
                    className="size-5"
                  />
                </span>
              </div>

              <div className="mt-1 md:mt-2 relative">
                <Input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  aria-label="Repeat password"
                  autoComplete="new-password"
                  required
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  aria-label="Show password"
                  id="toggleRepeatPasswordVisibility"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-xs leading-5"
                >
                  Show
                </button>
              </div>
            </div>

            <div
              id="strengthWrapper"
              className="relative flex items-center h-1.5 rounded-full bg-slate-300"
            >
              <div
                id="bars"
                className="h-1.5 rounded-full transition-all duration-400"
              ></div>
              <div
                id="strengthLabel"
                className="text-left capitalize text-slate-500 absolute top-2 left-0"
              ></div>
            </div>

            <div className="pb-0.5"></div>

            <button className="group relative overflow-hidden flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow transition duration-700">
              <span className="z-10 relative">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-accent-yellow to-yellow-200"></div>
              <div className="hover-target absolute inset-0 bg-gradient-to-r from-accent-yellow via-yellow-400 to-accent-yellow opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </button>
            {error && <p className="text-red-500 py-1">{error}</p>}
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
