import { AxiosIAMInstance } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { withAuthCookie, withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  return withRequestHandler(
    async () => {
      const accounts = await AxiosIAMInstance.get(
        "/accounts",
        await withAuthCookie()
      );
      return NextResponse.json(accounts);
    },
    request,
    "account.read"
  );
}
