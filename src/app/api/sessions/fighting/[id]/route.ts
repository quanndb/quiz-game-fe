import { withRequestHandler } from "@/app/api";
import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { GAME_MODE } from "@/lib/models/session.type";
import { JoinSessionSchema } from "@/lib/schemas/session.schema";
import { NextRequest, NextResponse } from "next/server";

// start game
export async function PUT(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withRequestHandler<JoinSessionSchema>(
    async ({ currentUser }) => {
      await connectDB();

      const session = await Session.findOne({
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
        (p: { playerId: string; isHost: boolean }) =>
          p.playerId === currentUser?.userId && p.isHost
      );

      if (!isHost) {
        return NextResponse.json(BAD_REQUEST_ERROR.notAHost, { status: 403 });
      }

      session.startAt = new Date();
      const updatedSession = await session.save();

      return NextResponse.json(updatedSession.toObject());
    },
    {
      permission: ANONYMOUS,
    }
  );
}
