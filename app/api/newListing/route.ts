export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, endsAt, tags, media, accessToken } = body;

    if (!accessToken || accessToken === undefined) {
      throw new Error("No access token provided.");
    }

    const apiResponse = await fetch(
      `${process.env.API_BASE}/auction/listings`,
      {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": process.env.API_KEY || "",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ title, description, endsAt, tags, media }),
      }
    );

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.message || "Failed to create listing.");
    }

    const data = await apiResponse.json();

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("An error occurred:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Server Error",
        status: "error",
      }),
      { status: 500 }
    );
  }
}
