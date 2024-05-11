"use server";

import { redirect } from "next/navigation";
import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function registerNewUserAction(
  currentState: any,
  formData: FormData
): Promise<any> {
  const validatedData = registerSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedData.success) {
    return { error: "Invalid email or password." };
  }

  const { name, email, password } = validatedData.data;

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
