import { connectDB } from "@/lib/db/mongodb";
import { Character } from "@/lib/models/character.model";
import { ICharacter } from "@/lib/models/character.type";
import { characterSchema } from "@/lib/schemas/character.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

// UPDATE & DELETE CHARACTER
// GET BY ID

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler(
    async () => {
      await connectDB();
      const character = await Character.findById(id).lean();
      return NextResponse.json(character);
    },
    {
      request,
    }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler<ICharacter>(
    async (body) => {
      await connectDB();
      const character = await Character.findByIdAndUpdate(id, body, {
        new: true,
      });
      return NextResponse.json(character);
    },
    {
      request,
      permission: "characters.update",
      schema: characterSchema,
    }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler(
    async () => {
      await connectDB();
      await Character.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    },
    {
      request,
      permission: "characters.delete",
    }
  );
}
