import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ data: [] });
  }

  const url = `${process.env.API_ALL_LISTINGS}/search?q=${query}&_bids=true&_seller=true&_active=true`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
