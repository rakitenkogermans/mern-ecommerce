import { Document } from "mongoose";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export interface IReviewModel extends IReview, Document {}
