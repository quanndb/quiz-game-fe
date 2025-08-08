import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Session } from "@/lib/models/session.model";
import { Topic } from "@/lib/models/topic.model";
import {
  createEventSessionSchema,
  CreateEventSessionSchema,
} from "@/lib/schemas/session.schema";
import { ANONYMOUS, GAME_MODE } from "@/lib/types/common.type";
import { ISession } from "@/lib/types/session.type";
import { TopicModel } from "@/lib/types/topic.type";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

export async function POST(request: NextRequest) {
  return withRequestHandler<CreateEventSessionSchema>(
    async ({ body, currentUser: user }) => {
      await connectDB();

      if (!user || !body?.topicId) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      // Kiểm tra người dùng đã tham gia session nào chưa
      const isExistingSession = await Session.exists({
        players: { $elemMatch: { email: user.email } },
        gameMode: { $in: [GAME_MODE.FIGHTING, GAME_MODE.EVENT] },
        endAt: undefined,
      });

      if (isExistingSession) {
        return NextResponse.json(BAD_REQUEST_ERROR.inASession, { status: 400 });
      }

      // Tìm topic
      const topic: TopicModel | null = await Topic.findOne({
        _id: body.topicId,
        gameMode: GAME_MODE.EVENT,
      });

      if (!topic) {
        return NextResponse.json(NOT_FOUND_ERROR.topicNotFound, {
          status: 404,
        });
      }

      // Tạo session mới
      const session: ISession = {
        gameMode: GAME_MODE.EVENT,
        startAt: new Date(),
        players: [
          {
            email: user.email,
            isHost: true,
            score: 0,
          },
        ],
        isFinished: false,
        topics: [topic],
        answers: [],
        currentPosition: { topicIndex: 0, questionIndex: 0 },
      };

      const createdSession = await Session.create(session);
      return NextResponse.json(createdSession);
    },
    {
      request,
      permission: ANONYMOUS,
      schema: createEventSessionSchema,
    }
  );
}
