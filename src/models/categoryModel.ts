import mongoose, { Schema } from "mongoose";

interface Category {
  name: String;
  description: String;
  image: String;
  attrts: Object[];
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "default category description" },
  image: { type: String },
  attrts: [{ key: { type: String }, value: [{ type: String }] }],
});

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
