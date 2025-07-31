import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config";
import { getDate } from "./dateUtils";
import { generateFileName } from "./fileNameGenerator";

async function uploadFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = generateFileName(file.name);
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: getDate() + "/" + fileName,
    Body: buffer,
    ContentType: file.type,
    ACL: "public-read",
  });
  await s3.send(command);
  return {
    url: `https://${
      process.env.BUCKET_NAME
    }.sgp1.vultrobjects.com/${getDate()}/${fileName}`,
    name: fileName,
  };
}

async function deleteFile(subFolder: string, fileName: string) {
  const key = subFolder + "/" + fileName;
  console.log("deleteFile:", key);
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  });
  await s3.send(command);
  return true;
}

export { deleteFile, uploadFile };
