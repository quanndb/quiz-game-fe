import { z } from "zod";
import { objectId } from "./common.schema";

export const sessionSchema = z.object({
  topicId: objectId,

  startAt: z.coerce.date().optional(),

  endAt: z.coerce.date().optional(),

  players: z
    .array(
      z.object({
        playerId: objectId,
        characterId: objectId,
        score: z.number().min(0, "Điểm số phải lớn hơn hoặc bằng 0"),
      })
    )
    .nonempty("Danh sách người chơi không được trống"),

  answers: z
    .array(
      z.object({
        playerId: objectId,
        questionId: objectId,
        answer: z.array(z.string().min(1, "Đáp án không được rỗng")),
      })
    )
    .optional(),
});
