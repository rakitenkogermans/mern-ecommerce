type ProductType = {
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
};

type ProductListState = { isLoading: boolean; products: ProductType[]; error: null | string };

enum ProductListActionTypes {
    PRODUCT_LIST_BEGIN = 'PRODUCT_LIST_BEGIN',
    PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_ERROR = 'PRODUCT_LIST_ERROR',
}

type ProductListAction =
    | { type: ProductListActionTypes.PRODUCT_LIST_BEGIN }
    | { type: ProductListActionTypes.PRODUCT_LIST_SUCCESS; payload: { products: ProductType[] } }
    | { type: ProductListActionTypes.PRODUCT_LIST_ERROR; payload: { msg: string } };

export { ProductListState, ProductListAction, ProductListActionTypes, ProductType };
