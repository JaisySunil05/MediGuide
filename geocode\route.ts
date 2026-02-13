import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log('api/geocode GET called', req.method, req.url);
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204 });
}
