import { model, models, Schema } from "mongoose";

const CharacterSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    frontImageUrl: { type: String, required: true },
    backImageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Character =
  models.Character || model("Character", CharacterSchema);
