"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const bidSchema = z.object({
  amount: z.number().int().positive(),
  id: z.string(),
});

export default async function bidAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const validatedData = bidSchema.safeParse({
    amount: Number(formData.get("amount")),
    id: formData.get("listingId"),
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

  const res = await fetch(process.env.ROOT_URL + `/api/[bid]`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();
  revalidatePath("/listing");

  if (data) {
    return { success: true, message: "Your bid is added!" };
  } else {
    return { error: "Failed to process bid" };
  }
}
