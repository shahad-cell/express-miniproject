import { Schema, model } from "mongoose";

const authorSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true, unique: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
  },
  {
    timestamps: true
  }
);

const Author = model("Author", authorSchema);

export default Author;
