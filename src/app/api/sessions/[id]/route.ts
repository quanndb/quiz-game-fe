import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { Character } from "@/lib/models/character.model";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import { GAME_MODE } from "@/lib/models/session.type";
import {
  JoinSessionSchema,
  joinSessionSchema,
} from "@/lib/schemas/session.schema";
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
      const session = await Session.findById(id).lean();
      return NextResponse.json(session);
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

  return withRequestHandler<JoinSessionSchema>(
    async ({ body, currentUser: user }) => {
      await connectDB();

      if (!user || !body) {
        return NextResponse.json(BAD_REQUEST_ERROR.invalidRequest, {
          status: 400,
        });
      }

      const session = await Session.findOne({ _id: id, endAt: undefined });
      if (!session) {
        return NextResponse.json(NOT_FOUND_ERROR.sessionNotFound, {
          status: 404,
        });
      }

      const isJoined = session.players.some(
        (p: { playerId: string }) => p.playerId === user.userId
      );
      const hasStarted = !!session.startAt;

      if (hasStarted && !isJoined) {
        return NextResponse.json(BAD_REQUEST_ERROR.gameStarted, {
          status: 400,
        });
      }

      if (isJoined) {
        // Remove player
        session.players = session.players.filter(
          (p: { playerId: string }) => p.playerId !== user.userId
        );

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

        // Validate character
        const characterExists = await Character.exists({
          _id: body.characterId,
        });
        if (!characterExists) {
          return NextResponse.json(NOT_FOUND_ERROR.characterNotFound, {
            status: 404,
          });
        }

        // Add player
        session.players.push({
          playerId: user.userId,
          email: user.email,
          isHost: false,
          characterId: body.characterId,
          score: 0,
        });
      }
      const updatedSession = await session.save();
      return NextResponse.json(updatedSession.toObject());
    },
    {
      request,
      permission: ANONYMOUS,
      schema: joinSessionSchema,
    }
  );
}
