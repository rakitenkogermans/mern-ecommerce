import { ProductType } from './index';

type ProductTopState = {
    isLoading: boolean;
    products: ProductType[];
    error: null | string;
};

enum ProductTopActionTypes {
    PRODUCT_TOP_BEGIN = 'PRODUCT_TOP_BEGIN',
    PRODUCT_TOP_SUCCESS = 'PRODUCT_TOP_SUCCESS',
    PRODUCT_TOP_ERROR = 'PRODUCT_TOP_ERROR',
}

type ProductTopAction =
    | { type: ProductTopActionTypes.PRODUCT_TOP_BEGIN }
    | { type: ProductTopActionTypes.PRODUCT_TOP_SUCCESS; payload: { products: ProductType[] } }
    | { type: ProductTopActionTypes.PRODUCT_TOP_ERROR; payload: { msg: string } };

export { ProductTopState, ProductTopAction, ProductTopActionTypes };
