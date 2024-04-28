"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import registerNewUserAction from "@/app/actions/registerNewUserAction";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

export default function SignUpPage() {
  const [error, formData] = useFormState(registerNewUserAction, undefined);

  return (
    <>
      <div className="flex flex-col justify-center px-4 lg:px-8 text-slate-900 mt-20">
        <h1 className="mb-6 text-center text-xl md:text-2xl tracking-tight">
          Sign up for a new account
        </h1>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4 md:space-y-6" action={formData}>
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
                type="password"
                aria-label="Password"
                autoComplete="new-password"
                required
                placeholder="Password"
              />
              <Button
                variant="link"
                aria-label="Show password"
                className="absolute top-7 right-0 px-3 flex items-center text-xs leading-5"
              >
                Show
              </Button>
            </div>

            <div className="pb-4">
              <span className="hidden">
                <img
                  src="/assets/icons/check-mark.svg"
                  alt="Check mark"
                  className="size-5"
                />
              </span>

              <div className="relative">
                <Input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  aria-label="Repeat password"
                  autoComplete="new-password"
                  required
                  placeholder="Repeat password"
                />
                <Button
                  variant="link"
                  aria-label="Show password"
                  className="absolute top-7 right-0 px-3 flex items-center text-xs leading-5"
                >
                  Show
                </Button>
              </div>
            </div>

            <Button size="full">Sign Up</Button>
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
