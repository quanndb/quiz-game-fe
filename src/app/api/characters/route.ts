import { connectDB } from "@/lib/db/mongodb";
import { Character } from "@/lib/models/character.model";
import { characterSchema } from "@/lib/schemas/character.schema";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function GET(request: NextRequest) {
  return withRequestHandler(
    async () => {
      await connectDB();
      const characters = await Character.find().lean();

      return NextResponse.json(characters);
    },
    {
      request,
    }
  );
}

export async function POST(request: NextRequest) {
  return withRequestHandler(
    async (body) => {
      await connectDB();
      const character = await Character.create(body);
      return NextResponse.json(character);
    },
    {
      request,
      permission: "characters.create",
      schema: characterSchema,
    }
  );
}
