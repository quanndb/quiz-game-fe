import { connectDB } from "@/lib/db/mongodb";
import { Session } from "@/lib/models/session.model";
import { Topic } from "@/lib/models/topic.model";
import { sessionSchema } from "@/lib/schemas/session.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function POST(request: NextRequest) {
  return withRequestHandler(
    async (body) => {
      await connectDB();
      if (!body?.topicId || !Topic.exists(body?.topicId)) {
        return NextResponse.json(
          { message: "Topic not found" },
          { status: 404 }
        );
      }
      const sessions = await Session.create({ ...body, startAt: new Date() });
      return NextResponse.json(sessions);
    },
    request,
    "sessions.create",
    sessionSchema
  );
}

export async function GET(request: NextRequest) {
  return withRequestHandler(async () => {
    await connectDB();
    const sessions = await Session.find().lean();
    return NextResponse.json(sessions);
  }, request);
}
