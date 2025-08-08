import z from "zod";

export const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "ID không hợp lệ");

export const createEnumSchema = (values: string[], message: string) =>
  z.string("Không được bỏ trống loại").refine((val) => values.includes(val), {
    message: message + `: (${values.join(", ")})`,
  });
