import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  const url = `${process.env.API_ALL_LISTINGS}/${params.listingId}?_seller=true`;
  const accessToken = cookies().get("accessToken")?.value;

  if (!params.listingId) {
    return new NextResponse("Listing id is required", { status: 400 });
  }

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": process.env.API_KEY || "",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.log(["LISTING_GET"], error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  const body = await req.json();

<<<<<<< HEAD
  console.log(["PUT_BODY"], body);

=======
>>>>>>> 6f81d2ed69fc40b2e54f9ba91d41bca24f9ec54c
  const url = `${process.env.API_ALL_LISTINGS}/${params.listingId}`;
  const accessToken = cookies().get("accessToken")?.value;

  if (!params.listingId) {
    return new NextResponse("Listing id is required", { status: 400 });
  }

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

<<<<<<< HEAD
    console.log(["PUT"], res);

=======
>>>>>>> 6f81d2ed69fc40b2e54f9ba91d41bca24f9ec54c
    revalidatePath("/");

    return new Response(JSON.stringify({ success: true, data: res }), {
      status: 200,
    });
  } catch (error) {
<<<<<<< HEAD
    console.log(["CANINE_PUT"], error);
=======
    console.log(["LISTINGS_PUT"], error);
>>>>>>> 6f81d2ed69fc40b2e54f9ba91d41bca24f9ec54c
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  const url = `${process.env.API_ALL_LISTINGS}/${params.listingId}`;
  const accessToken = cookies().get("accessToken")?.value;

  if (!params.listingId) {
    return new NextResponse("Listing id is required", { status: 400 });
  }

  if (!accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": process.env.API_KEY || "",
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/");

    return new Response(JSON.stringify({ success: true, data: res }), {
      status: 200,
    });
  } catch (error) {
    console.log(["LISTINGS_DELETE"], error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
