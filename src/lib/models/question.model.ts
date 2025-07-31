import { model, models, Schema, Types } from "mongoose";

const QuestionSchema = new Schema(
  {
    topicId: {
      type: Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    title: { type: String, required: true },
    mediaUrl: { type: String },
    type: { type: String, required: true },
    resources: {
      type: [String],
      required: false,
    },
    answer: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Question = models.Question || model("Question", QuestionSchema);
