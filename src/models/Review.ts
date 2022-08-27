import { model, Schema } from "mongoose";
import { IReviewModel } from "../types/Review";

const ReviewSchema = new Schema<IReviewModel>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// const Review = model<IReviewModel>("Review", ReviewSchema);
export { ReviewSchema };
