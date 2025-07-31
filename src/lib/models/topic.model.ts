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
  },
  {
    timestamps: true,
  }
);

export const Topic = models.Topic || model("Topic", TopicSchema);
