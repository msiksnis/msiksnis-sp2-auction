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

  console.log("FromAction: Validated data:", validatedData);

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

  console.log("From Action: Sending to server:", body);

  const res = await fetch(process.env.ROOT_URL + `/api/[bid]`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!res.ok) {
    // Assuming the server might send non-JSON responses that could be plain text:
    const errorText = await res.text();
    console.error("Failed to place a bid:", errorText);
    return { error: errorText };
  }

  const data = await res.json();
  revalidatePath("/listing");

  if (data) {
    return { success: true, message: "Your bid is added!" };
  } else {
    return { error: "Failed to process bid" };
  }
}
