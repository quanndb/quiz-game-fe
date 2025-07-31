import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-southeast-1",
  endpoint: "https://sgp1.vultrobjects.com", // đổi region nếu cần
  credentials: {
    accessKeyId: process.env.VULTR_ACCESS_KEY!,
    secretAccessKey: process.env.VULTR_SECRET_KEY!,
  },
  forcePathStyle: true, // Quan trọng để tương thích với S3
});

export default s3;
