export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const loginData = {
    email,
    password,
  };

  // Sends the data to the Noroff API for authentication
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

    const data = await apiResponse.json();

    // Return the response with user data without sensitive information
    return new Response(JSON.stringify({ user: data }), {
      status: 200,
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
