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
      required: true,
    },
    endAt: {
      type: Date,
    },
    players: [
      {
        playerId: {
          type: Types.ObjectId,
          ref: "Player",
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
    answers: [
      {
        playerId: {
          type: Types.ObjectId,
          ref: "Player",
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
      },
    ],
  },
  { timestamps: true }
);

export const Session = models.Session || model("Session", SessionSchema);
