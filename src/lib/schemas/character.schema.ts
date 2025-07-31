import z from "zod";

export const characterSchema = z.object({
  name: z.string("Không được bỏ trống").nonempty("Không được bỏ trống"),
  description: z.string("Không được bỏ trống").optional(),
  frontImageUrl: z.string("Không được bỏ trống"),
  backImageUrl: z.string("Không được bỏ trống"),
});

export type Character = z.infer<typeof characterSchema>;
