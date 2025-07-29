import { connectDB } from "@/lib/db/mongodb";
import { Character } from "@/lib/models/character.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const quizzes = await Character.find().lean();

    return NextResponse.json(quizzes);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
