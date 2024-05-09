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

  console.log("THIS IS THE BODY FROM AVATAR ACTION:", body);

  const res = await fetch(process.env.ROOT_URL + `/api/editUserAvatar/[name]`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();

  revalidatePath("/profile/");

  if (data) {
    return { success: true, message: "Successbully updated!" };
  } else {
    return { error: "Failed to update." };
  }
}
