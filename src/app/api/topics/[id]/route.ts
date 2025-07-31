import { connectDB } from "@/lib/db/mongodb";
import { Question } from "@/lib/models/question.model";
import { Topic } from "@/lib/models/topic.model";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return withRequestHandler(
    async () => {
      await connectDB();
      await Topic.findByIdAndDelete(id);
      await Question.deleteMany({ topicId: id });
      return NextResponse.json({ success: true });
    },
    request,
    "topics.delete"
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return withRequestHandler(async () => {
    await connectDB();
    const topic = await Topic.findById(id).lean();
    if (!topic)
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    const questions = await Question.find({ topicId: id }).lean();
    return NextResponse.json({ ...topic, questions });
  }, request);
}
