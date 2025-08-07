import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Character } from "@/lib/models/character.model";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { GAME_MODE, ISession } from "@/lib/models/session.type";
import { Topic } from "@/lib/models/topic.model";
import {
  createEventSessionSchema,
  CreateEventSessionSchema,
} from "@/lib/schemas/session.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

export async function POST(request: NextRequest) {
  return withRequestHandler<CreateEventSessionSchema>(
    async ({ body, currentUser: user }) => {
      await connectDB();

      if (!user || !body?.characterId || !body?.topicId) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      // Kiểm tra người dùng đã tham gia session nào chưa
      const existingSession = await Session.exists({
        players: { $elemMatch: { playerId: user.userId } },
        gameMode: { $in: [GAME_MODE.FIGHTING, GAME_MODE.EVENT] },
        endAt: undefined,
      });

      if (existingSession) {
        return NextResponse.json(BAD_REQUEST_ERROR.inASession, { status: 400 });
      }

      // Kiểm tra nhân vật tồn tại
      const characterExists = await Character.exists({ _id: body.characterId });
      if (!characterExists) {
        return NextResponse.json(NOT_FOUND_ERROR.characterNotFound, {
          status: 404,
        });
      }

      // Tìm topic
      const topic = await Topic.findOne({
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
        topicId: topic._id.toString(),
        gameMode: GAME_MODE.EVENT,
        startAt: new Date(),
        numOfQuests: topic.questions?.length ?? 0,
        players: [
          {
            playerId: user.userId,
            email: user.email,
            characterId: body.characterId,
            isHost: true,
            score: 0,
          },
        ],
        userAnswers: [],
        quests: [],
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
