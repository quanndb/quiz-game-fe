import { NextRequest, NextResponse } from "next/server";

export function cookieChecker(request: NextRequest) {
  return NextResponse.next();
}
