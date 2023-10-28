import mongoose, { Schema } from "mongoose";
import ReviewModel from "./reviwModel";
import UserModel from "./userModel";

interface Product {
  user: Object;
  name: string;
  description: string;
  image: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  category: string;
  price: number;
  sales?: number;
  attrts?: Object[];
  reviews: [];
}

const productSchema = new Schema<Product>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    rating: { type: Number },
    category: { type: String },
    numReviews: { type: Number },
    countInStock: { type: Number },
    price: { type: Number, required: true },
    sales: { type: Number, default: 0 },
    attrts: [{ key: { type: String }, value: { type: String } }],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ReviewModel,
      },
    ],
  },
  { timestamps: true }
);
productSchema.index(
  { name: "text", description: "text" },
  { name: "TextIndex" }
);
productSchema.index({ "attrts.key": 1, "attrts.value": 1 });

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;


