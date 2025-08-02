import { connectDB } from "@/lib/db/mongodb";
import { Character } from "@/lib/models/character.model";
import { ANONYMOUS } from "@/lib/models/common.type";
import { Session } from "@/lib/models/session.model";
import {
  JoinSessionSchema,
  joinSessionSchema,
} from "@/lib/schemas/session.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

// Toggle user game session
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler<JoinSessionSchema>(
    async ({ body, currentUser: user }) => {
      await connectDB();
      // find by id and endAt is null
      const session = await Session.findOne({ _id: id, endAt: null });
      if (!session) {
        return NextResponse.json(
          { message: "Không tìm thấy phiên trò chơi" },
          { status: 404 }
        );
      }
      // check if the game has started then return
      if (session.startAt)
        return NextResponse.json(
          { message: "Phiên trò chơi đã bắt đầu" },
          { status: 400 }
        );
      // if user is null or body is null then return
      if (!user || !body) {
        return NextResponse.json(
          { message: "Yêu cầu không hợp lệ" },
          { status: 404 }
        );
      }
      // if visible in session.players then remove it, else add it
      if (
        session.players.some(
          (p: { playerId: string }) => p.playerId === user.userId
        )
      ) {
        session.players = session.players.filter(
          (p: { playerId: string }) => p.playerId !== user.userId
        );
        // move host to another player
        // end game if no player
        if (session.players.length === 0) {
          session.endAt = new Date();
        } else {
          session.players[0].isHost = true;
        }
      } else {
        if (!(await Character.exists({ _id: body.characterId }))) {
          return NextResponse.json(
            { message: "Không tìm thấy nhân vật" },
            { status: 404 }
          );
        }
        session.players.push({
          playerId: user.userId,
          email: user.email,
          isHost: false,
          characterId: body.characterId,
          score: 0,
        });
      }
      return NextResponse.json((await session.save()).toObject());
    },
    {
      request,
      permission: ANONYMOUS,
      schema: joinSessionSchema,
    }
  );
}

// start game
export async function PUT(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler<JoinSessionSchema>(
    async ({ currentUser }) => {
      await connectDB();
      // find by id and endAt is null
      const session = await Session.findOne({ _id: id, endAt: null });
      if (!session) {
        return NextResponse.json(
          { message: "Không tìm thấy phiên trò chơi" },
          { status: 404 }
        );
      }
      // check if user is host then can start game else return error
      if (
        !session.players.some(
          (p: { playerId: string; isHost: boolean }) =>
            p.playerId === currentUser?.userId && p.isHost
        )
      ) {
        return NextResponse.json(
          { message: "Bạn không phải người chủ trì" },
          { status: 404 }
        );
      }
      if (session) session.startAt = new Date();
      return NextResponse.json((await session.save()).toObject());
    },
    {
      permission: ANONYMOUS,
    }
  );
}
