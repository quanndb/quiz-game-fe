import { Schema, model, models } from "mongoose";
import {
  CHARACTER,
  GAME_MODE,
  PART_MECHANISM,
  QUESTION_TYPE,
} from "./common.type";

const TopicSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    mediaUrl: { type: String },
    gameMode: {
      type: String,
      enum: GAME_MODE,
      required: true,
    },
    character: { type: String, enum: CHARACTER },
    parts: [
      {
        type: {
          type: String,
          enum: PART_MECHANISM,
          required: true,
          default: PART_MECHANISM.NORMAL,
        },
        questions: [
          {
            title: { type: String, required: true },
            description: { type: String },
            timeLimit: { type: Number },
            mediaUrl: { type: String },
            type: {
              type: QUESTION_TYPE,
              required: true,
              default: QUESTION_TYPE.MATCH_ALL,
            },
            resources: [
              {
                mediaUrl: { type: String },
                title: { type: String },
                value: { type: String, required: true },
              },
            ],
            answer: { type: [[String]], required: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Topic = models.Topic || model("Topic", TopicSchema);
