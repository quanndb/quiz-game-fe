import z from "zod";

export const objectId = z
  .string()
  .min(1, "ID không được bỏ trống")
  .regex(/^[0-9a-fA-F]{24}$/, "ID không hợp lệ");
