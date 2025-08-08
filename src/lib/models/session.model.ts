import { model, models, Schema } from "mongoose";
import { CHARACTER, GAME_MODE, GAME_STATUS } from "../types/common.type";
import { TopicModelSchema } from "./topic.model";

const SessionModelSchema = new Schema(
  {
    gameMode: {
      type: String,
      enum: GAME_MODE,
      required: true,
    },
    character: {
      type: String,
      enum: CHARACTER,
    },
    sessionCode: {
      type: String,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: GAME_STATUS,
      required: true,
    },
    lastStartAnswerAt: {
      type: Date,
    },
    topics: [TopicModelSchema],
    players: [
      {
        isHost: {
          type: Boolean,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
    currentPosition: {
      topicIndex: {
        type: Number,
        required: true,
      },
      questionIndex: {
        type: Number,
        required: true,
      },
    },
    answers: [
      {
        email: {
          type: String,
          required: true,
        },
        questionId: {
          type: String,
          required: true,
        },
        answer: {
          type: [[String]],
          required: true,
        },
        answeredAt: {
          type: Date,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Session = models.Session || model("Session", SessionModelSchema);
