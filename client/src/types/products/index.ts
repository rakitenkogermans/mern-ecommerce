export type ProductType = {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews?: ReviewType[];
};

export type ReviewType = {
    name: string;
    rating: number;
    comment: string;
    user: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductPaginationType = { products: ProductType[]; page: number; pages: number };
