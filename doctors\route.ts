import { NextResponse } from "next/server";
import { doctors } from "@/app/data/doctors";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department");

  if (!department) return NextResponse.json(doctors);

  const filtered = doctors.filter(
    (doc) => doc.department.toLowerCase() === department.toLowerCase()
  );

  return NextResponse.json(filtered);
}
