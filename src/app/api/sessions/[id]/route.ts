import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Session } from "@/lib/models/session.model";

import { ANONYMOUS, GAME_MODE } from "@/lib/types/common.type";
import { ISession, SessionModel } from "@/lib/types/session.type";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler(
    async () => {
      await connectDB();
      const session: SessionModel | null = await Session.findOne({ _id: id });
      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }
      const tempt = session.toObject() as ISession;
      const result = {
        ...tempt,
        topics: [
          ...tempt.topics.map((t: { questions: unknown[] }) => {
            return {
              ...t,
              questions: undefined,
            };
          }),
        ],
        answers: undefined,
        currentPosition: undefined,
      };
      return NextResponse.json(result);
    },
    { request }
  );
}

// toogle join
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withRequestHandler(
    async ({ body, currentUser: user }) => {
      await connectDB();

      if (!user || !body) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      const session: SessionModel | null = await Session.findOne({
        _id: id,
        endAt: undefined,
      });
      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      const isJoined = session.players.some(
        (p: { email: string }) => p.email === user.userId
      );
      const hasStarted = !!session.startAt;

      if (hasStarted && !isJoined) {
        return NextResponse.json(BAD_REQUEST_ERROR.gameStarted, {
          status: 400,
        });
      }

      if (isJoined) {
        // Remove player
        session.players = session.players.filter((p) => p.email !== user.email);

        if (session.players.length === 0) {
          session.endAt = new Date(); // End session if no one left
        } else {
          session.players[0].isHost = true; // Assign host to first player
        }
      } else {
        // Ensure only FIGHTING mode can be joined manually
        if (session.gameMode !== GAME_MODE.FIGHTING) {
          return NextResponse.json(BAD_REQUEST_ERROR.cantJoinThisSession, {
            status: 400,
          });
        }

        // Add player
        session.players.push({
          email: user.email,
          isHost: false,
          score: 0,
        });
      }
      return NextResponse.json(await session.save());
    },
    {
      request,
      permission: ANONYMOUS,
    }
  );
}
