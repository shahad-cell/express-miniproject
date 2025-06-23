import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    coverImage: { type: String },
    deleted: { type: Boolean, default: false }, 
  },
  {
    timestamps: true, 
  }
);

const Book = model("Book", bookSchema);

export default Book;
