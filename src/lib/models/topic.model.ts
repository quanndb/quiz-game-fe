import { Schema, model, models } from "mongoose";
import { CHARACTER, GAME_MODE, QUESTION_TYPE } from "../types/common.type";

export const TopicModelSchema = new Schema(
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
    questions: [
      {
        title: { type: String, required: true },
        description: { type: String },
        timeLimit: { type: Number },
        mediaUrl: { type: String },
        type: {
          type: String,
          enum: QUESTION_TYPE,
          required: true,
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
  {
    timestamps: true,
  }
);

export const Topic = models.Topic || model("Topic", TopicModelSchema);
