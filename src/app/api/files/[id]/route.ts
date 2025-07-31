import { connectDB } from "@/lib/db/mongodb";
import { File } from "@/lib/models/file.model";
import { deleteFile } from "@/lib/utils/s3Manager";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "../..";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return withRequestHandler(async () => {
    await connectDB();
    const file = await File.findById(id);
    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }
    await deleteFile(file.subFolder, file.savedName);
    await File.deleteOne({ _id: id });
    return NextResponse.json({ success: true });
  }, request);
}
