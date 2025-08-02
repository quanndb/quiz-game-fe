import BAD_REQUEST_ERROR from "@/lib/exceptions/badRequest";
import { File } from "@/lib/models/file.model";
import { getDate } from "@/lib/utils/dateUtils";
import { uploadFile } from "@/lib/utils/s3Manager";
import { NextRequest, NextResponse } from "next/server";
import { withRequestHandler } from "..";

export async function POST(request: NextRequest) {
  return withRequestHandler(
    async () => {
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
