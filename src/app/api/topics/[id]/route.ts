import { connectDB } from "@/lib/db/mongodb";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Topic } from "@/lib/models/topic.model";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler(
    async () => {
      await connectDB();
      await Topic.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    },
    {
      request,
      permission: "topics.delete",
    }
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler(
    async () => {
      await connectDB();
      const topic = await Topic.findById(id).lean();
      if (!topic)
        return NextResponse.json(NOT_FOUND_ERROR.topicNotFound, {
          status: 404,
        });
      return NextResponse.json(topic);
    },
    { request }
  );
}
