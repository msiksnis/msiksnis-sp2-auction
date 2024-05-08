"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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
    return { message: "Invalid email or password." };
  }

  const body = JSON.stringify({
    ...validatedData.data,
  });

  const res = await fetch(process.env.ROOT_URL + "/api/login", {
    method: "POST",
    body,
  });

  const data = await res.json();

  console.log(data);

  if (res.ok) {
    const { accessToken, name } = data;
    const avatarUrl = data.avatar.url;

    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      path: "/",
      sameSite: "strict" as const,
    };

    cookies().set("accessToken", accessToken, { ...cookieOptions });
    cookies().set("userName", name, { ...cookieOptions, httpOnly: false });
    cookies().set("userAvatar", avatarUrl, {
      ...cookieOptions,
      httpOnly: false,
    });

    // redirect("/");
    if (data) {
      return { success: true, message: "Login successful!" };
    }
  } else {
    return { message: "Failed to log in. Please try again." };
  }
}
