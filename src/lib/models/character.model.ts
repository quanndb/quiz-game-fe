import { model, models, Schema } from "mongoose";

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  imageUrlSelected: { type: String, required: true },
  imageUrlUnselected: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Character =
  models.Character || model("Character", CharacterSchema);
