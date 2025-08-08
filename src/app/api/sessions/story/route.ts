import { connectDB } from "@/lib/db/mongodb";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Session } from "@/lib/models/session.model";
import { Topic } from "@/lib/models/topic.model";
import { AnswerSchema, answerSchema } from "@/lib/schemas/session.schema";
import { ANONYMOUS, GAME_MODE, GAME_STATUS } from "@/lib/types/common.type";
import { ISession, SessionModel } from "@/lib/types/session.type";
import { TopicModel } from "@/lib/types/topic.type";
import {
  getCurrentQuestion,
  isAllPlayerAnswered,
  isCurrentPlayerHost,
  nextQuestion,
} from "@/lib/utils/gameMechanism";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

// get current question
export async function GET(params: NextRequest) {
  return withRequestHandler(
    async ({ currentUser: user }) => {
      await connectDB();
      // get current cookie
      const cookiesStore = await cookies();
      const sessionId = cookiesStore.get("storySessionId")?.value;
      if (!sessionId) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }
      // check session
      const session: SessionModel | null = await Session.findOne({
        _id: sessionId,
        gameMode: GAME_MODE.STORY,
        startAt: { $exists: true },
        endAt: { $exists: false },
        status: { $ne: GAME_STATUS.FINISHED },
      });

      if (
        !session ||
        !(
          session.status == GAME_STATUS.READYING &&
          isCurrentPlayerHost(session, user)
        )
      ) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      if (isAllPlayerAnswered(session)) {
        session.lastStartAnswerAt = new Date();
        nextQuestion(session);
        await session.save();
      }

      // get current question
      const currentQuestion = getCurrentQuestion(session);
      if (!currentQuestion) {
        return NextResponse.json({ isFinished: true });
      }

      return NextResponse.json(currentQuestion);
    },
    { request: params }
  );
}

// answer current question
export async function PATCH(request: NextRequest) {
  return withRequestHandler<AnswerSchema>(
    async ({ body, currentUser }) => {
      await connectDB();
      // get current cookie
      const cookiesStore = await cookies();
      const sessionId = cookiesStore.get("storySessionId")?.value;
      if (!sessionId) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }
      // check session
      const session: SessionModel | null = await Session.findOne({
        _id: sessionId,
        gameMode: GAME_MODE.STORY,
        startAt: { $exists: true },
        endAt: { $exists: false },
        isFinished: false,
      });

      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      await session.save();
      return NextResponse.json({ success: true });
    },
    { request, schema: answerSchema }
  );
}

// create new session
export async function POST(request: NextRequest) {
  return withRequestHandler(
    async () => {
      await connectDB();

      // Lấy topic theo STORY mode
      const topics: TopicModel[] = await Topic.find({
        gameMode: GAME_MODE.STORY,
      }).sort({ name: 1 });
      if (topics.length === 0) {
        return NextResponse.json(NOT_FOUND_ERROR.topicNotFound, {
          status: 404,
        });
      }

      // Kết thúc session cũ nếu có
      const cookieStore = await cookies();
      const prevSessionId = cookieStore.get("storySessionId")?.value;
      if (prevSessionId) {
        await Session.updateOne({ _id: prevSessionId }, { endAt: new Date() });
      }

      // Tạo session mới
      const session: ISession = {
        gameMode: GAME_MODE.STORY,
        startAt: new Date(),
        players: [
          {
            email: ANONYMOUS,
            isHost: true,
            score: 0,
          },
        ],
        topics: topics,
        answers: [],
        status: GAME_STATUS.READYING,
        currentPosition: { topicIndex: 0, questionIndex: 0 },
      };

      const createdSession: SessionModel = await Session.create(session);

      // Lưu session mới vào cookie
      cookieStore.set("storySessionId", createdSession._id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 năm
      });

      return NextResponse.json({ success: true });
    },
    {
      request,
    }
  );
}
