import { model, models, Schema } from "mongoose";
import { CHARACTER, GAME_MODE } from "./common.type";
import { Topic } from "./topic.model";

const SessionSchema = new Schema(
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
    orderedTopics: [Topic],
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
    currentPosition: {
      topicIndex: {
        type: Number,
        required: true,
      },
      partIndex: {
        type: Number,
        required: true,
      },
      questionIndex: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Session = models.Session || model("Session", SessionSchema);
