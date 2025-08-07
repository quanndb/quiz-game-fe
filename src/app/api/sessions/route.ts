import { connectDB } from "@/lib/db/mongodb";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  const isEnded = request.nextUrl.searchParams.get("ended") === "true";
  return withRequestHandler(
    async () => {
      await connectDB();
      const sessions = await Session.find({
        endAt: isEnded ? { $exists: true } : { $exists: false },
      }).lean();
      const result = sessions.map((s) => ({
        ...s,
        quests: undefined,
        userAnswers: undefined,
      }));
      return NextResponse.json(result);
    },
    {
      request,
      permission: ANONYMOUS,
    }
  );
}
