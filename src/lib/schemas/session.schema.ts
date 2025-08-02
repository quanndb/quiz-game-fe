import { uuid, z } from "zod";
import { objectId } from "./common.schema";

export const createSessionSchema = z.object({
  topicId: objectId,
  characterId: objectId,
});
export type CreateSessionSchema = z.infer<typeof createSessionSchema>;

export const joinSessionSchema = z.object({
  characterId: objectId,
});
export type JoinSessionSchema = z.infer<typeof joinSessionSchema>;

export const sessionSchema = z.object({
  topicId: objectId,

  startAt: z.coerce.date().optional(),

  endAt: z.coerce.date().optional(),

  players: z
    .array(
      z.object({
        characterId: uuid("ID người chơi không hợp lệ"),
      }),
      "Danh sách người chơi không được trống"
    )
    .optional(),

  userAnswers: z
    .array(
      z.object({
        playerId: objectId,
        questionId: objectId,
        answer: z.array(z.string().min(1, "Đáp án không được rỗng")),
        answeredAt: z.coerce.date("Không được bỏ trống thời điểm trả lời"),
        isCorrect: z.boolean("Không được bỏ trống trạng thái trả lời"),
      })
    )
    .optional(),
});
