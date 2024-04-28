// app/api/signup/route.ts

import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";

export async function POST(request: Request) {
  // Read data from the request body
  const body = await request.json();

  const { name, email, password } = body;

  // Validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json(
      {
        error: "Invalid email or password is not strong enough.",
      },
      { status: 400 }
    );
  }

  // Prepare data for API submission
  const userData = {
    name,
    email,
    password,
  };

  // Send the data to the external API
  try {
    const apiResponse = await fetch(`${process.env.API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(
        `${apiResponse.status}: ${errorData.message || "Failed to register user."}`
      );
    }

    const responseData = await apiResponse.json();

    return new Response(JSON.stringify(responseData), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
