import { Document, Types } from 'mongoose';
import { IReviewModel } from './Review';

export interface IProduct {
    user: Types.ObjectId;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    reviews: Types.DocumentArray<IReviewModel>;
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
}

export interface IProductModel extends IProduct, Document {}
