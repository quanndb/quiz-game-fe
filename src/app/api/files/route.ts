import { connectDB } from "@/lib/db/mongodb";
import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import NOT_FOUND_ERROR from "@/lib/exceptions/notFound";
import { File } from "@/lib/models/file.model";
import { getDate } from "@/lib/utils/dateUtils";
import { deleteFile, uploadFile } from "@/lib/utils/s3Manager";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function POST(request: NextRequest) {
  return withRequestHandler(
    async () => {
      await connectDB();
      const formData = await request.formData();
      const file = formData.get("file") as File;
      if (!file) {
        return NextResponse.json(BAD_REQUEST_ERROR.notHaveFile, {
          status: 400,
        });
      }
      const { url, name } = await uploadFile(file);
      const newFile = await File.create({
        name: file.name,
        subFolder: getDate(),
        url,
        size: file.size,
        type: file.type,
        savedName: name,
      });
      return NextResponse.json({ data: newFile });
    },
    { request, permission: "files.create" }
  );
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json(BAD_REQUEST_ERROR.notHaveFile, { status: 400 });
  }
  return withRequestHandler(
    async () => {
      await connectDB();
      const file = await File.findOne({ url });
      if (!file) {
        return NextResponse.json(NOT_FOUND_ERROR.fileNotFound, { status: 404 });
      }
      await deleteFile(file.subFolder, file.savedName);
      await File.deleteOne({ _id: file._id });
      return NextResponse.json({ success: true });
    },
    { request, permission: "files.delete" }
  );
}

export async function GET(params: NextRequest) {
  return withRequestHandler(
    async () => {
      await connectDB();
      const files = await File.find().lean();
      return NextResponse.json({ data: files });
    },
    { request: params, permission: "files.get" }
  );
}
