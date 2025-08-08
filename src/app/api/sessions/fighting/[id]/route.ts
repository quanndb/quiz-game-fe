import { withRequestHandler } from "@/app/api";
import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Session } from "@/lib/models/session.model";
import { ANONYMOUS, GAME_MODE } from "@/lib/types/common.type";
import { SessionModel } from "@/lib/types/session.type";
import { NextRequest, NextResponse } from "next/server";

// start game
export async function PUT(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withRequestHandler(
    async ({ currentUser }) => {
      await connectDB();

      const session: SessionModel | null = await Session.findOne({
        _id: id,
        gameMode: GAME_MODE.FIGHTING,
        endAt: undefined,
      });

      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      if (session.startAt) {
        return NextResponse.json(BAD_REQUEST_ERROR.gameStarted, {
          status: 400,
        });
      }

      const isHost = session.players.some(
        (p: { email: string; isHost: boolean }) =>
          p.email === currentUser?.userId && p.isHost
      );

      if (!isHost) {
        return NextResponse.json(BAD_REQUEST_ERROR.notAHost, { status: 403 });
      }

      session.startAt = new Date();

      return NextResponse.json(await session.save());
    },
    {
      permission: ANONYMOUS,
    }
  );
}
