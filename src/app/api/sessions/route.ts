import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Character } from "@/lib/models/character.model";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { Topic } from "@/lib/models/topic.model";
import {
  CreateSessionSchema,
  createSessionSchema,
} from "@/lib/schemas/session.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function POST(request: NextRequest) {
  return withRequestHandler<CreateSessionSchema>(
    async ({ body, currentUser: user }) => {
      await connectDB();
      // validate user in a session or not
      if (
        await Session.exists({
          players: { $elemMatch: { playerId: user?.userId } },
        })
      ) {
        return NextResponse.json(BAD_REQUEST_ERROR.inASession, { status: 400 });
      }
      // validate topic
      if (!body?.topicId || !(await Topic.exists({ _id: body.topicId }))) {
        return NextResponse.json(NOT_FOUND_ERROR.topicNotFound, {
          status: 404,
        });
      }
      // validate characters
      if (
        !body?.characterId ||
        !(await Character.exists({ _id: body.characterId }))
      ) {
        return NextResponse.json(NOT_FOUND_ERROR.characterNotFound, {
          status: 404,
        });
      }
      // create session
      const players = [
        {
          playerId: user?.userId,
          email: user?.email,
          characterId: body.characterId,
          isHost: true,
          score: 0,
        },
      ];
      const newSession = {
        ...body,
        players,
        userAnswers: [],
      };
      return NextResponse.json((await Session.create(newSession)).toObject());
    },
    {
      request,
      permission: ANONYMOUS,
      schema: createSessionSchema,
    }
  );
}

export async function GET(request: NextRequest) {
  const isEnded = request.nextUrl.searchParams.get("ended") === "true";
  return withRequestHandler(
    async () => {
      await connectDB();
      const sessions = await Session.find({
        endAt: isEnded ? { $exists: true } : { $exists: false },
      }).lean();
      return NextResponse.json(sessions);
    },
    {
      request,
      permission: ANONYMOUS,
    }
  );
}
