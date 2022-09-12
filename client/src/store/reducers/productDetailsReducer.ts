import {
    ProductDetailsAction,
    ProductDetailsActionTypes,
    ProductDetailsState,
} from '../../types/products/productDetails';
import { ProductType } from '../../types/products';

const productDetailsInitialState: ProductDetailsState = {
    isLoading: false,
    product: {} as ProductType,
    error: null,
};

const productDetailsReducer = (
    state = productDetailsInitialState,
    action: ProductDetailsAction
): ProductDetailsState => {
    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_BEGIN) {
        return { ...state, isLoading: true, error: null };
    }

    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS) {
        return { ...state, isLoading: false, product: action.payload.product, error: null };
    }

    if (action.type === ProductDetailsActionTypes.PRODUCT_DETAILS_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    return state;
};

export { productDetailsReducer };
