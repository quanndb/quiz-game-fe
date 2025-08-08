import { connectDB } from "@/lib/db/mongodb";
import { ANONYMOUS } from "@/lib/models/common.type";
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
      const result = topics.map((t) => ({
        ...t,
        parts: [
          ...t.parts.map((p: { questions: unknown[] }) => ({
            ...p,
            questions: undefined,
          })),
        ],
      }));
      return NextResponse.json(result);
    },
    { request, permission: ANONYMOUS }
  );
}

export async function POST(request: NextRequest) {
  return withRequestHandler<ITopic>(
    async ({ body }) => {
      await connectDB();
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
