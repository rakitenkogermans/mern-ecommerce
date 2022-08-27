import { model, Schema } from "mongoose";
import { IProductModel } from "../types/Product";
import { ReviewSchema } from "./Review";

const ProductSchema: Schema = new Schema<IProductModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide image"],
      unique: true,
    },
    brand: {
      type: String,
      required: [true, "Please provide brand"],
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [ReviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = model<IProductModel>("Product", ProductSchema);
export { Product };
