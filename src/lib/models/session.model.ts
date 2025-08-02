import { model, models, Schema, Types } from "mongoose";

const SessionSchema = new Schema(
  {
    topicId: {
      type: Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    players: [
      {
        playerId: {
          // UUID
          type: String,
          required: true,
        },
        isHost: {
          type: Boolean,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        characterId: {
          type: Types.ObjectId,
          ref: "Character",
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
    userAnswers: [
      {
        playerId: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        questionId: {
          type: Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: [String],
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

export const Session = models.Session || model("Session", SessionSchema);
