export function generateFileName(fileName: string): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);

  // Lấy phần mở rộng file nếu có
  const extension = fileName.includes(".") ? fileName.split(".").pop() : "";
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");

  // Normalize tên file
  const safeName = nameWithoutExt
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // khoảng trắng => dấu gạch ngang
    .replace(/[^a-z0-9\-]/g, ""); // loại bỏ ký tự không an toàn

  return `${safeName}-${timestamp}${extension ? "." + extension : ""}`;
}
