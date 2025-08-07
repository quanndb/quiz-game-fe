import { withRequestHandler } from "@/app/api";
import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { GAME_MODE } from "@/lib/models/session.type";
import { Topic } from "@/lib/models/topic.model";
import { IQuestion } from "@/lib/models/topic.type";
import { AnswerSchema, answerSchema } from "@/lib/schemas/session.schema";
import { getNextElement } from "@/lib/utils/arrayUtils";
import { ObjectId } from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get current question
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withRequestHandler(
    async ({ currentUser: user }) => {
      await connectDB();

      const session = await Session.findOne({
        _id: id,
        startAt: { $exists: true },
        endAt: { $exists: false },
      });

      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      if (session.gameMode === GAME_MODE.STORY) {
        const cookieStore = await cookies();
        const storySessionId = cookieStore.get("storySessionId")?.value;
        if (!storySessionId || storySessionId !== session._id.toString()) {
          return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
            status: 404,
          });
        }
      } else {
        const isJoined = session.players.some(
          (p: { playerId: string }) => p.playerId === user?.userId
        );
        if (!isJoined) {
          return NextResponse.json(BAD_REQUEST_ERROR.notInThisSession, {
            status: 400,
          });
        }
      }

      const topic = await Topic.findById(session.topicId);
      if (!topic) {
        return NextResponse.json(NOT_FOUND_ERROR.topicNotFound, {
          status: 404,
        });
      }

      const questions = topic.questions;
      if (questions.length === 0) {
        return NextResponse.json(NOT_FOUND_ERROR.questionNotFound, {
          status: 404,
        });
      }

      // Nếu chưa có quest nào → khởi tạo với câu đầu tiên
      if (session.quests.length === 0) {
        const firstQuestion = questions[0];
        session.quests.push({
          questionId: firstQuestion._id,
          questedAt: new Date(),
        });
        await session.save();
        return NextResponse.json(firstQuestion);
      }

      const lastQuest = session.quests[session.quests.length - 1];
      const currentQuestion = questions.find(
        (q: { _id: ObjectId }) => q._id.toString() === lastQuest.questionId
      );

      if (!currentQuestion) {
        return NextResponse.json(NOT_FOUND_ERROR.questionNotFound, {
          status: 404,
        });
      }

      const answeredCount = session.userAnswers.filter(
        (a: { questionId: string }) => a.questionId === lastQuest.questionId
      ).length;

      const allPlayersAnswered = answeredCount >= session.players.length;

      if (allPlayersAnswered) {
        const currentIndex = questions.findIndex(
          (q: { _id: ObjectId }) => q._id.toString() === lastQuest.questionId
        );

        const nextQuestion = getNextElement<IQuestion>(questions, currentIndex);
        if (!nextQuestion) {
          return NextResponse.json(NOT_FOUND_ERROR.questionNotFound, {
            status: 404,
          });
        }

        session.quests.push({
          questionId: nextQuestion._id,
          questedAt: new Date(),
        });

        await session.save();
        return NextResponse.json(nextQuestion);
      }

      return NextResponse.json(currentQuestion);
    },
    { request, permission: ANONYMOUS }
  );
}

// answer question
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withRequestHandler<AnswerSchema>(
    async ({ body, currentUser: user }) => {
      await connectDB();

      if (!body?.answer || !Array.isArray(body.answer)) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      const session = await Session.findOne({ _id: id, endAt: undefined });
      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      const topic = await Topic.findById(session.topicId);
      if (!topic) {
        return NextResponse.json(NOT_FOUND_ERROR.topicNotFound, {
          status: 404,
        });
      }

      const isStoryMode = session.gameMode === GAME_MODE.STORY;
      const playerId = isStoryMode ? ANONYMOUS : user?.userId;
      const email = isStoryMode ? ANONYMOUS : user?.email;
      const questId = session.quests[session.quests.length - 1].questionId;

      if (!playerId) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      const question = topic.questions.find(
        (q: { _id: string }) => q._id.toString() === questId
      );

      if (!question) {
        return NextResponse.json(NOT_FOUND_ERROR.questionNotFound, {
          status: 404,
        });
      }

      const hasAnswered = session.userAnswers.some(
        (a: { playerId: string; questionId: string }) => {
          return a.playerId === playerId && a.questionId === questId;
        }
      );

      if (hasAnswered) {
        return NextResponse.json(BAD_REQUEST_ERROR.alreadyAnswered, {
          status: 400,
        });
      }

      // So sánh chính xác mảng câu trả lời
      const isCorrect =
        Array.isArray(question.answer) &&
        question.answer.length === body.answer.length &&
        question.answer.every(
          (ans: string, idx: number) => ans === body.answer[idx]
        );

      session.userAnswers.push({
        playerId,
        email,
        questionId: questId,
        answer: body.answer,
        isCorrect,
        answeredAt: new Date(),
      });

      // if all questions are answered, set endAt
      const answeredCount = session.userAnswers.filter(
        (a: { questionId: string }) => {
          return (
            a.questionId ===
            topic.questions[topic.questions.length - 1]._id.toString()
          );
        }
      ).length;

      const allPlayersAnswered = answeredCount >= session.players.length;
      console.log("answeredCount", answeredCount);
      if (allPlayersAnswered) {
        session.endAt = new Date();
      }
      await session.save();
      return NextResponse.json({ success: isCorrect });
    },
    {
      request,
      permission: ANONYMOUS,
      schema: answerSchema,
    }
  );
}
