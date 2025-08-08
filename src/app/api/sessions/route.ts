import { connectDB } from "@/lib/db/mongodb";
import { Session } from "@/lib/models/session.model";
import { ANONYMOUS } from "@/lib/types/common.type";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  const isEnded = request.nextUrl.searchParams.get("isEnded") === "true";
  const isFinished = request.nextUrl.searchParams.get("isFinished");
  return withRequestHandler(
    async () => {
      await connectDB();
      const sessions = await Session.find({
        endAt: isEnded ? { $exists: true } : { $exists: false },
        ...(isFinished ? { isFinished: isFinished === "true" } : {}),
      }).lean();
      const result = sessions.map((s) => ({
        ...s,
        topics: [
          ...s.topics.map((t: { questions: unknown[] }) => {
            return {
              ...t,
              questions: undefined,
            };
          }),
        ],
        answers: undefined,
        currentPosition: undefined,
      }));
      return NextResponse.json(result);
    },
    {
      request,
      permission: ANONYMOUS,
    }
  );
}
