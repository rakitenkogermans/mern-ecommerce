import { Document, Types } from "mongoose";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

export interface IReviewModel extends IReview, Document {}
