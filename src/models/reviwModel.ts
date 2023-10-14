import mongoose, { Schema } from "mongoose";
import UserModel from "./userModel";

interface Review {
  name: String;
  comment: String;
  rating: Number;
  user: {
    _id: mongoose.Schema.Types.ObjectId;
  };
}

const reviewsSchema = new Schema<Review>(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Reviews", reviewsSchema);

export default ReviewModel;
