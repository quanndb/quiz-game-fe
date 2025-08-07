import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Character } from "@/lib/models/character.model";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { GAME_MODE, ISession } from "@/lib/models/session.type";
import { Topic } from "@/lib/models/topic.model";
import {
  CreateStoryOrFightingSessionSchema,
  createStoryOrFightingSessionSchema,
} from "@/lib/schemas/session.schema";
import { generateRandomCode } from "@/lib/utils/randomCodeGenerator";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

const generateSessionCode = async () => {
  let randomCode = generateRandomCode(6);
  while (
    await Session.exists({
      sessionCode: randomCode,
      gameMode: GAME_MODE.FIGHTING,
      endAt: undefined,
    })
  ) {
    randomCode = generateRandomCode(6);
  }
  return randomCode;
};

export async function POST(request: NextRequest) {
  return withRequestHandler<CreateStoryOrFightingSessionSchema>(
    async ({ body, currentUser: user }) => {
      await connectDB();

      if (!user || !body?.characterId) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      // Kiểm tra người dùng đã tham gia session chưa
      const inSession = await Session.exists({
        players: { $elemMatch: { playerId: user.userId } },
        gameMode: { $in: [GAME_MODE.FIGHTING, GAME_MODE.EVENT] },
        endAt: undefined,
      });

      if (inSession) {
        return NextResponse.json(BAD_REQUEST_ERROR.inASession, { status: 400 });
      }

      // Kiểm tra nhân vật tồn tại
      const characterExists = await Character.exists({ _id: body.characterId });
      if (!characterExists) {
        return NextResponse.json(NOT_FOUND_ERROR.characterNotFound, {
          status: 404,
        });
      }

      // Lấy topic ngẫu nhiên theo game mode FIGHTING
      const [topic] = await Topic.aggregate([
        { $match: { gameMode: GAME_MODE.FIGHTING } },
        { $sample: { size: 1 } },
      ]);

      if (!topic) {
        return NextResponse.json(NOT_FOUND_ERROR.topicNotFound, {
          status: 404,
        });
      }

      // Tạo session
      const session: ISession = {
        topicId: topic._id.toString(),
        gameMode: GAME_MODE.FIGHTING,
        sessionCode: (await generateSessionCode()).toString(),
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
      schema: createStoryOrFightingSessionSchema,
    }
  );
}
