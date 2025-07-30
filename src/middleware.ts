// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // for (const mw of middlewares) {
  //   const result = mw(request);
  //   if (result instanceof NextResponse) {
  //     return result; // Nếu middleware trả về response → dừng chain
  //   }
  // }

  return NextResponse.next(); // Cho qua nếu không middleware nào chặn
}

export const config = {
  matcher: "/:path*",
};
