import { uuid, z } from "zod";
import { GAME_MODE } from "../models/common.type";
import { createEnumSchema, objectId } from "./common.schema";

// create session
export const createSessionSchema = z.object({
  gameMode: createEnumSchema(
    Object.values(GAME_MODE),
    "Chế độ chơi không hợp lệ"
  ),
  topicId: objectId.optional(),
  characterId: objectId.min(1, "Không được bỏ trống nhân vật"),
});
export type CreateSessionSchema = z.infer<typeof createSessionSchema>;

// create story or fighting session
export const createStoryOrFightingSessionSchema = z.object({
  characterId: objectId.min(1, "Không được bỏ trống nhân vật"),
});

export type CreateStoryOrFightingSessionSchema = z.infer<
  typeof createStoryOrFightingSessionSchema
>;

// create event session
export const createEventSessionSchema = z.object({
  characterId: objectId.min(1, "Không được bỏ trống nhân vật"),
  topicId: objectId.min(1, "Không được bỏ trống topic"),
});
export type CreateEventSessionSchema = z.infer<typeof createEventSessionSchema>;

// join session
export const joinSessionSchema = z.object({
  characterId: objectId,
});
export type JoinSessionSchema = z.infer<typeof joinSessionSchema>;

// answer schema
export const answerSchema = z.object({
  answer: z
    .array(z.string().min(1, "Không được bỏ trống đáp án"))
    .min(1, "Không được bỏ trống đáp án"),
});
export type AnswerSchema = z.infer<typeof answerSchema>;

// common
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
