import { connectDB } from "@/lib/db/mongodb";
import { Topic } from "@/lib/models/topic.model";
import { topicSchema } from "@/lib/schemas/topic.schema";
import { ITopic, TopicModel } from "@/lib/types/topic.type";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  return withRequestHandler(
    async () => {
      await connectDB();
      const topics = await Topic.find().lean();
      const result = topics.map((t) => ({
        ...t,
        questions: undefined,
      }));
      return NextResponse.json(result);
    },
    { request, permission: "topics.read" }
  );
}

export async function POST(request: NextRequest) {
  return withRequestHandler<ITopic>(
    async ({ body }) => {
      await connectDB();
      const topic: TopicModel = await Topic.create(body);
      return NextResponse.json(topic);
    },
    {
      request,
      permission: "topics.create",
      schema: topicSchema,
    }
  );
}
