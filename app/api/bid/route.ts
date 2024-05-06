import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, amount, accessToken } = body;

    console.log("Route: Placing a bid:", body);

    if (!accessToken || accessToken === undefined) {
      throw new Error("No access token provided.");
    }

    if (!id || id === undefined) {
      throw new Error("No listing ID provided.");
    }

    const apiResponse = await fetch(
      `${process.env.API_BASE}/auction/listings/${id}/bids`,
      {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": process.env.API_KEY || "",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ amount }),
      }
    );

    const apiResponseBody = await apiResponse.text();

    if (!apiResponse.ok) {
      console.error("Error placing bid:", apiResponseBody);
      return new NextResponse(apiResponseBody, { status: apiResponse.status });
    }

    revalidatePath("/listing");

    return NextResponse.json({ message: "Bid placed successfully." });
  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
