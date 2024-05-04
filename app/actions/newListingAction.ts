"use server";

import * as z from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const newListingSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().optional(),
  endsAt: z.string(),
  tags: z.array(z.string()).optional(),
  media: z.array(
    z.object({
      url: z.string(),
      alt: z.string(),
    })
  ),
});

export default async function newListingAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const valitedData = newListingSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    endsAt: formData.get("date"),
    tags: formData
      .get("tags")
      ?.toString()
      .split(",")
      .map((tag: string) => tag.trim()),
    media: formData.getAll("images").map((item: any) => {
      return {
        url: typeof item === "string" ? item : "",
        alt: formData.get("title") || "Default alt text",
      };
    }),
  });

  const token = cookies().get("accessToken");
  const accessToken = token?.value;

  if (!accessToken) {
    return { error: "No access token provided." };
  }

  if (!valitedData.success) {
    return { error: valitedData.error };
  }

  const body = JSON.stringify({
    ...valitedData.data,
    accessToken,
  });

  const res = await fetch(process.env.ROOT_URL + "/api/newListing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const data = await res.json();

  revalidatePath("/");

  if (res.ok) {
    return { success: true, message: "Listing created successfully!" };
  } else {
    return { error: data.error };
  }
}
