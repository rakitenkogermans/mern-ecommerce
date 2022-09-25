import {
    ProductCreateAction,
    ProductCreateActionTypes,
    ProductCreateState,
} from '../../types/products/productCreate';

const productCreateInitialState: ProductCreateState = {
    isLoading: false,
    product: null,
    success: false,
    error: null,
};

const productCreateReducer = (
    state = productCreateInitialState,
    action: ProductCreateAction
): ProductCreateState => {
    if (action.type === ProductCreateActionTypes.PRODUCT_CREATE_BEGIN) {
        return { ...state, isLoading: true, success: false, error: null };
    }

    if (action.type === ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            product: action.payload.product,
            success: true,
            error: null,
        };
    }

    if (action.type === ProductCreateActionTypes.PRODUCT_CREATE_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    if (action.type === ProductCreateActionTypes.PRODUCT_CREATE_RESET) {
        return productCreateInitialState;
    }

    return state;
};

export { productCreateReducer };
