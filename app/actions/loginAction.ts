"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginAction(
  currentState: any,
  formData: FormData
): Promise<any> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(process.env.ROOT_URL + "/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    const { accessToken, name } = data.user.data;
    const avatarUrl = data.user.data.avatar.url;

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

    redirect("/");
  } else {
    return data.error;
  }
}
