import { axios } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const accounts = await axios.get("/accounts", {
      headers: {
        Authorization: `Bearer ${request.cookies.get("Authorization")?.value}`,
      },
    });
    console.log(accounts);
    return NextResponse.json(accounts);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
