import { withRequestHandler } from "@/app/api";
import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Session } from "@/lib/models/session.model";
import { AnswerSchema, answerSchema } from "@/lib/schemas/session.schema";
import { ANONYMOUS, GAME_MODE } from "@/lib/types/common.type";
import { SessionModel } from "@/lib/types/session.type";
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

      const session: SessionModel | null = await Session.findOne({
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
        const isJoined = session.players.some((p) => p.email === user?.email);
        if (!isJoined) {
          return NextResponse.json(BAD_REQUEST_ERROR.notInThisSession, {
            status: 400,
          });
        }
      }

      await session.save();
      return NextResponse.json({});
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
    async ({}) => {
      await connectDB();

      const session: SessionModel | null = await Session.findOne({
        _id: id,
        endAt: undefined,
      });
      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      await session.save();
      return NextResponse.json({ success: false });
    },
    {
      request,
      permission: ANONYMOUS,
      schema: answerSchema,
    }
  );
}
