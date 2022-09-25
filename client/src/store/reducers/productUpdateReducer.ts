import {
    ProductUpdateAction,
    ProductUpdateActionTypes,
    ProductUpdateState,
} from '../../types/products/productUpdate';

const productUpdateInitialState: ProductUpdateState = {
    isLoading: false,
    success: false,
    error: null,
};

const productUpdateReducer = (
    state = productUpdateInitialState,
    action: ProductUpdateAction
): ProductUpdateState => {
    if (action.type === ProductUpdateActionTypes.PRODUCT_UPDATE_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS) {
        return { ...state, isLoading: false, success: true, error: null };
    }

    if (action.type === ProductUpdateActionTypes.PRODUCT_UPDATE_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    if (action.type === ProductUpdateActionTypes.PRODUCT_UPDATE_RESET) {
        return productUpdateInitialState;
    }

    return state;
};

export { productUpdateReducer };
