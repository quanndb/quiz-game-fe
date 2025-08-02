import z from "zod";
import { QUESTION_TYPE, TOPIC_MODE } from "../models/topic.type";

export const topicSchema = z.object({
  name: z.string().nonempty("Không được bỏ trống"),
  mode: z.enum(TOPIC_MODE),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  questions: z
    .array(
      z.object({
        title: z.string().nonempty("Không được bỏ trống"),
        description: z.string().optional(),
        mediaUrl: z.string().optional(),
        type: z.enum(QUESTION_TYPE),
        resources: z
          .array(z.object({ type: z.string(), value: z.string() }))
          .optional(),
        answer: z.union([
          z.string().nonempty("Không được bỏ trống"),
          z.array(z.string()).min(1, "Không được bỏ trống"),
        ]),
      })
    )
    .optional(),
});

export type Topic = z.infer<typeof topicSchema>;
