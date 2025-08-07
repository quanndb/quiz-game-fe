import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import { GAME_MODE } from "@/lib/models/session.type";
import { Topic } from "@/lib/models/topic.model";
import { ITopic } from "@/lib/models/topic.type";
import { topicSchema } from "@/lib/schemas/topic.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  return withRequestHandler(
    async () => {
      await connectDB();
      const topics = await Topic.find().lean();
      const topicsWithQuestions = topics.map((topic) => ({
        ...topic,
        questions: undefined,
      }));
      return NextResponse.json(topicsWithQuestions);
    },
    { request, permission: "topics.get" }
  );
}

export async function POST(request: NextRequest) {
  return withRequestHandler<ITopic>(
    async ({ body }) => {
      await connectDB();
      if (
        body?.gameMode === GAME_MODE.STORY &&
        (await Topic.exists({ gameMode: GAME_MODE.STORY }))
      )
        return NextResponse.json(BAD_REQUEST_ERROR.storyModeTopicExists, {
          status: 400,
        });
      const topic = await Topic.create(body);
      return NextResponse.json(topic);
    },
    {
      request,
      permission: "topics.create",
      schema: topicSchema,
    }
  );
}
