import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userName, avatar, accessToken } = body;

    if (!accessToken || accessToken === undefined) {
      throw new Error("No access token provided.");
    }

    if (!userName || userName === undefined) {
      throw new Error("No listing ID provided.");
    }

    await fetch(`${process.env.API_PROFILES}/${userName}`, {
      method: "PUT",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": process.env.API_KEY || "",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        avatar,
      }),
    });

    return NextResponse.json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
