import { Schema, model } from "mongoose";

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
  },
  {
    timestamps: true 
  }
);
const Category = model("Category", categoriesSchema);
export default Category;
