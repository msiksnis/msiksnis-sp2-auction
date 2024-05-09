"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const editUserSchema = z.object({
  bio: z.string().optional(),
  userName: z.string(),
});

export default async function editUserBioAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const validatedData = editUserSchema.safeParse({
    bio: formData.get("bio"),
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

  console.log("THIS IS THE BODY FROM BIO ACTION:", body);

  const res = await fetch(process.env.ROOT_URL + `/api/editUserBio/[name]`, {
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
