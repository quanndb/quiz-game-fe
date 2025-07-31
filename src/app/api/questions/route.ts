import { connectDB } from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  return withRequestHandler(async () => {
    await connectDB();
    return NextResponse.json({ success: true });
  }, request);
}
