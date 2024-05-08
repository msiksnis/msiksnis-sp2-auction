import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const loginData = {
    email,
    password,
  };

  try {
    const apiResponse = await fetch(`${process.env.API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      const errorMessage =
        process.env.NODE_ENV === "development"
          ? `${apiResponse.status}: ${errorData.message || "Failed to authenticate."}`
          : "Authentication failed. Please check your credentials and try again.";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: apiResponse.status,
      });
    }

    const { data } = await apiResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("[LOGIN_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
