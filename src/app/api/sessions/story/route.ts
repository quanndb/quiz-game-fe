import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Character } from "@/lib/models/character.model";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { GAME_MODE, ISession } from "@/lib/models/session.type";
import { Topic } from "@/lib/models/topic.model";
import {
  createStoryOrFightingSessionSchema,
  CreateStoryOrFightingSessionSchema,
} from "@/lib/schemas/session.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

export async function POST(request: NextRequest) {
  return withRequestHandler<CreateStoryOrFightingSessionSchema>(
    async ({ body }) => {
      await connectDB();

      // Kiểm tra characterId hợp lệ
      if (!body?.characterId) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      const characterExists = await Character.exists({ _id: body.characterId });
      if (!characterExists) {
        return NextResponse.json(NOT_FOUND_ERROR.characterNotFound, {
          status: 404,
        });
      }

      // Lấy topic theo STORY mode
      const topic = await Topic.findOne({ gameMode: GAME_MODE.STORY });
      if (!topic) {
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
        topicId: topic._id.toString(),
        gameMode: GAME_MODE.STORY,
        startAt: new Date(),
        numOfQuests: topic.questions?.length ?? 0,
        players: [
          {
            playerId: ANONYMOUS,
            email: ANONYMOUS,
            characterId: body.characterId,
            isHost: true,
            score: 0,
          },
        ],
        userAnswers: [],
        quests: [],
      };

      const createdSession = await Session.create(session);

      // Lưu session mới vào cookie
      cookieStore.set("storySessionId", createdSession._id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 năm
      });

      return NextResponse.json(createdSession);
    },
    {
      request,
      schema: createStoryOrFightingSessionSchema,
    }
  );
}
