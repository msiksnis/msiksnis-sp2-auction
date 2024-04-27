// app/api/logout/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Clear cookies by setting them with a past expiration date
  const response = new NextResponse(null, {
    headers: {
      "Set-Cookie": [
        "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict",
        "userName=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "userAvatar=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      ],
    } as unknown as HeadersInit,
  });

  return response;
}
