import { connectDB } from "@/lib/db/mongodb";
import { Question } from "@/lib/models/question.model";
import { Topic } from "@/lib/models/topic.model";
import { Question as QuestionType } from "@/lib/models/topic.type";
import { topicSchema } from "@/lib/schemas/topic.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  return withRequestHandler(async () => {
    await connectDB();
    const topics = await Topic.find().lean();
    return NextResponse.json(topics);
  }, request);
}

export async function POST(request: NextRequest) {
  return withRequestHandler(
    async (body) => {
      await connectDB();
      const topic = await Topic.create(body);
      if (body?.questions instanceof Array) {
        const questionsWithTopicId = body.questions.map((q: QuestionType) => ({
          ...q,
          topicId: topic._id,
        }));
        await Question.insertMany(questionsWithTopicId);
        return NextResponse.json({
          ...topic.toObject(),
          questions: questionsWithTopicId,
        });
      }
      return NextResponse.json(topic);
    },
    request,
    "topics.create",
    topicSchema
  );
}
