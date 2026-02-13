import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const placeId = searchParams.get("placeId");

    if (!placeId) {
      return NextResponse.json(
        { error: "Missing placeId" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing Google API key" },
        { status: 500 }
      );
    }

    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=name,formatted_address,rating,formatted_phone_number,geometry` +
      `&key=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Google API failed" },
        { status: 500 }
      );
    }

    // Read raw text first to handle empty or invalid JSON responses
    const text = await res.text();

    if (!text) {
      return NextResponse.json(
        { error: "Empty response from Google API" },
        { status: 502 }
      );
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON from Google API", details: String(e) },
        { status: 502 }
      );
    }

    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
