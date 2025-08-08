import z from "zod";
import {
  CHARACTER,
  GAME_MODE,
  PART_MECHANISM,
  QUESTION_TYPE,
} from "../models/common.type";
import { createEnumSchema } from "./common.schema";

export const topicSchema = z.object({
  name: z.string().nonempty("Không được bỏ trống"),
  description: z.string().optional(),
  mediaUrl: z.string().optional(),
  gameMode: createEnumSchema(
    Object.values(GAME_MODE),
    `Chế độ chơi không hợp lệ`
  ).nonempty("Không được bỏ trống chế độ chơi"),
  character: createEnumSchema(
    Object.values(CHARACTER),
    `Nhân vật không hợp lệ`
  ),
  parts: z
    .array(
      z.object({
        type: createEnumSchema(
          Object.values(PART_MECHANISM),
          `Loại cơ chế không hợp lệ`
        ),
        questions: z
          .array(
            z.object({
              title: z.string().nonempty("Không được bỏ trống"),
              description: z.string().optional(),
              timeLimit: z.number().optional(),
              mediaUrl: z.string().optional(),
              type: createEnumSchema(
                Object.values(QUESTION_TYPE),
                `Loại câu hỏi không hợp lệ`
              ),
              resources: z
                .array(
                  z.object({
                    mediaUrl: z.string().optional(),
                    title: z.string().optional(),
                    value: z.string().min(1, "Không được bỏ trống"),
                  })
                )
                .optional(),
              answer: z.union([
                z
                  .array(z.string().nonempty())
                  .nonempty({ message: "Không được bỏ trống" }), // string[]
                z
                  .array(
                    z
                      .array(z.string().nonempty())
                      .nonempty("Không được bỏ trống") // string[][]
                  )
                  .nonempty("Không được bỏ trống"),
              ]),
            })
          )
          .optional(),
      }),
      "Danh sách không bỏ trống"
    )
    .nonempty("Không được bỏ trống"),
});

export type Topic = z.infer<typeof topicSchema>;
