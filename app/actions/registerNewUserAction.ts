"use server";

import { redirect } from "next/navigation";

export default async function registerNewUserAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(process.env.ROOT_URL + "/api/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    redirect("/login");
  } else {
    return data.error;
  }
}
