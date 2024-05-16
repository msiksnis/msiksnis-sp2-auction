"use server";

import { cookies } from "next/headers";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function loginAction(
  currentState: any,
  formData: FormData
): Promise<any> {
  const validatedData = loginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedData.success) {
    console.log("Validation failed:", validatedData.error);
    return {
      state: { success: false, error: true },
      message: "Invalid email or password.",
    };
  }

  const body = JSON.stringify({
    ...validatedData.data,
  });

  const res = await fetch(`${process.env.ROOT_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (res.ok) {
    const data = await res.json();
    const { accessToken, name, avatar } = data;

    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      path: "/",
      sameSite: "strict" as const,
    };

    cookies().set("accessToken", accessToken, { ...cookieOptions });
    cookies().set("userName", name, { ...cookieOptions, httpOnly: false });
    cookies().set("userAvatar", avatar.url, {
      ...cookieOptions,
      httpOnly: false,
    });

    return { success: true, message: "Logged in successfully." };
  } else {
    const errorData = await res.json();
    const errorMessage =
      errorData.message || "Failed to log in. Please try again.";

    console.log("Login failed, setting state to error");
    return {
      state: { success: false, error: true },
      message: errorMessage,
    };
  }
}
