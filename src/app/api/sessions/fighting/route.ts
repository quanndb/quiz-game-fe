import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Session } from "@/lib/models/session.model";
import { Topic } from "@/lib/models/topic.model";
import { ANONYMOUS, GAME_MODE } from "@/lib/types/common.type";
import { ISession } from "@/lib/types/session.type";
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
  return withRequestHandler(
    async ({ currentUser: user }) => {
      await connectDB();

      if (!user) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      // Kiểm tra người dùng đã tham gia session chưa
      const isInSession = await Session.exists({
        players: { $elemMatch: { email: user.email } },
        gameMode: { $in: [GAME_MODE.FIGHTING, GAME_MODE.EVENT] },
        endAt: undefined,
      });

      if (isInSession) {
        return NextResponse.json(BAD_REQUEST_ERROR.inASession, { status: 400 });
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
        gameMode: GAME_MODE.FIGHTING,
        sessionCode: (await generateSessionCode()).toString(),
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

      return NextResponse.json(await Session.create(session));
    },
    {
      request,
      permission: ANONYMOUS,
    }
  );
}
