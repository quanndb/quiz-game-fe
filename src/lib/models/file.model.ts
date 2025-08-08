import { model, models, Schema } from "mongoose";

const FileModelSchema = new Schema(
  {
    name: { type: String, required: true },
    savedName: { type: String, required: true },
    subFolder: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const File = models.File || model("File", FileModelSchema);
