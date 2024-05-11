"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const editUserSchema = z.object({
  avatar: z
    .object({
      url: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  userName: z.string(),
});

export default async function editUserAvatarAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const validatedData = editUserSchema.safeParse({
    avatar: {
      url: formData.get("avatarUrl") || "",
      alt: formData.get("avatarAlt") || "",
    },
    userName: formData.get("name"),
  });

  const token = cookies().get("accessToken");
  const accessToken = token?.value;

  if (!accessToken) {
    return { error: "No access token provided." };
  }

  if (!validatedData.success) {
    return { error: validatedData.error };
  }

  const body = JSON.stringify({
    ...validatedData.data,
    accessToken,
  });

  const res = await fetch(process.env.ROOT_URL + `/api/editUserAvatar/[name]`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { error: "Failed to update avatar: " + errorData.message };
  }
  console.log("d a t a:", validatedData.data.avatar?.url);

  const data = await res.json();

  const url = validatedData.data.avatar?.url ?? "";

  cookies().set("userAvatar", url, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    path: "/",
    sameSite: "strict",
  });

  revalidatePath("/profile/");

  if (data) {
    return { success: true, message: "Successfully updated!" };
  } else {
    return { error: "Failed to update." };
  }
}
