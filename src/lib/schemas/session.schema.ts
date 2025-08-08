import { z } from "zod";
import { objectId } from "./common.schema";

// create event session
export const createEventSessionSchema = z.object({
  topicId: objectId.min(1, "Không được bỏ trống topic"),
});
export type CreateEventSessionSchema = z.infer<typeof createEventSessionSchema>;

// answer schema
export const answerSchema = z.object({
  answer: z
    .array(z.string().min(1, "Không được bỏ trống đáp án"))
    .min(1, "Không được bỏ trống đáp án"),
});
export type AnswerSchema = z.infer<typeof answerSchema>;
