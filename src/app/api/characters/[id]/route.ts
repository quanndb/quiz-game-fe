import { connectDB } from "@/lib/db/mongodb";
import { Character } from "@/lib/models/character.model";
import { characterSchema } from "@/lib/schemas/character.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

// UPDATE & DELETE CHARACTER
// GET BY ID

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return withRequestHandler(async () => {
    await connectDB();
    const character = await Character.findById(id).lean();
    return NextResponse.json(character);
  }, request);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return withRequestHandler(
    async (body) => {
      await connectDB();
      const character = await Character.findByIdAndUpdate(id, body, {
        new: true,
      });
      return NextResponse.json(character);
    },
    request,
    "characters.update",
    characterSchema
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return withRequestHandler(
    async () => {
      await connectDB();
      await Character.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    },
    request,
    "characters.delete"
  );
}
