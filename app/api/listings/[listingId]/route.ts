import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
    console.log(["CANINE_DELETE"], error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
