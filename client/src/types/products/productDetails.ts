import { ProductType } from './index';

type ProductDetailsState = {
    isLoading: boolean;
    product: ProductType | null;
    error: null | string;
};

enum ProductDetailsActionTypes {
    PRODUCT_DETAILS_BEGIN = 'PRODUCT_DETAILS_BEGIN',
    PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS',
    PRODUCT_DETAILS_ERROR = 'PRODUCT_DETAILS_ERROR',
}

type ProductDetailsAction =
    | { type: ProductDetailsActionTypes.PRODUCT_DETAILS_BEGIN }
    | { type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS; payload: { product: ProductType } }
    | { type: ProductDetailsActionTypes.PRODUCT_DETAILS_ERROR; payload: { msg: string } };

export { ProductDetailsState, ProductDetailsAction, ProductDetailsActionTypes };
