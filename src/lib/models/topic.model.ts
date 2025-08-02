import { Schema, model, models } from "mongoose";
import { TOPIC_MODE } from "./topic.type";

const TopicSchema = new Schema(
  {
    name: { type: String, required: true },
    mode: {
      type: String,
      enum: TOPIC_MODE,
      required: true,
    },
    description: { type: String },
    imageUrl: { type: String },
    questions: [
      {
        title: { type: String, required: true },
        description: { type: String },
        mediaUrl: { type: String },
        type: { type: String, required: true },
        resources: [
          {
            type: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
        answer: { type: [String], required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Topic = models.Topic || model("Topic", TopicSchema);
