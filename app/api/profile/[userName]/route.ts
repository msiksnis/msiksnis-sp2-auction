// /app/api/profile/[userName]/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userName: string } }
) {
  const { userName } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const accessToken = token?.value;

  try {
    if (!params!.userName) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const res = await fetch(`${process.env.API_PROFILES}/${userName}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { data } = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("[PROFILE_BY_NAME_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
