"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import registerNewUserAction from "@/app/actions/registerNewUserAction";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordsDoNotMatchError, setPasswordsDoNotMatchError] = useState("");
  const [error, formData] = useFormState(registerNewUserAction, undefined);

  const formRef = useRef<HTMLFormElement>(null);

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordsMatchNow = newPassword === repeatPassword;
    setPasswordsMatch(passwordsMatchNow);
    if (passwordsMatchNow) {
      setPasswordsDoNotMatchError("");
    }
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);
    const passwordsMatchNow = newRepeatPassword === password;
    setPasswordsMatch(passwordsMatchNow);
    if (passwordsMatchNow) {
      setPasswordsDoNotMatchError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setPasswordsDoNotMatchError("Passwords do not match.");
      return;
    }

    // To proceed with form submission if validation passes
    if (formRef.current !== null) {
      formRef.current.submit();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center px-4 lg:px-8 text-slate-900 mt-20">
        <h1 className="mb-6 text-center text-xl md:text-2xl tracking-tight">
          Sign up for a new account
        </h1>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-4 md:space-y-6"
            ref={formRef}
            action={formData}
            onSubmit={handleSubmit}
          >
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
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                variant="link"
                aria-label="Show password"
                onClick={toggleShowPassword}
                className="absolute top-7 right-0 px-3 flex items-center text-xs leading-5 focus-visible:outline -outline-offset-4 outline-black"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>

            <div className="relative">
              <Input
                id="repeatPassword"
                name="repeatPassword"
                type={showRepeatPassword ? "text" : "password"}
                aria-label="Repeat password"
                autoComplete="new-password"
                required
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
              />
              <Button
                variant="link"
                aria-label="Show password"
                onClick={toggleShowRepeatPassword}
                className="absolute top-7 right-0 px-3 flex items-center text-xs leading-5 focus-visible:outline -outline-offset-4 outline-black"
              >
                {showRepeatPassword ? "Hide" : "Show"}
              </Button>
              {passwordsMatch && (
                <span className="absolute left-32 top-0.5">
                  <img
                    src="/assets/icons/check-mark.svg"
                    alt="Check mark"
                    className="size-5"
                  />
                </span>
              )}
            </div>

            <Button size="full">Sign Up</Button>
            {(error || passwordsDoNotMatchError) && (
              <p className="text-red-500">
                {error || passwordsDoNotMatchError}
              </p>
            )}
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
