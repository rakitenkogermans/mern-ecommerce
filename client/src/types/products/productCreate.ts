import { ProductType } from './index';

type ProductCreateState = {
    isLoading: boolean;
    product: ProductType | null;
    success: boolean;
    error: null | string;
};

enum ProductCreateActionTypes {
    PRODUCT_CREATE_BEGIN = 'PRODUCT_CREATE_BEGIN',
    PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS',
    PRODUCT_CREATE_ERROR = 'PRODUCT_CREATE_ERROR',
    PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET',
}

type ProductCreateAction =
    | { type: ProductCreateActionTypes.PRODUCT_CREATE_BEGIN }
    | { type: ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS; payload: { product: ProductType } }
    | { type: ProductCreateActionTypes.PRODUCT_CREATE_ERROR; payload: { msg: string } }
    | { type: ProductCreateActionTypes.PRODUCT_CREATE_RESET };

export { ProductCreateState, ProductCreateAction, ProductCreateActionTypes };
