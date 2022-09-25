import {
    ProductDeleteAction,
    ProductDeleteActionTypes,
    ProductDeleteState,
} from '../../types/products/productDelete';

const productDeleteInitialState: ProductDeleteState = {
    isLoading: false,
    success: false,
    error: null,
};

const productDeleteReducer = (
    state = productDeleteInitialState,
    action: ProductDeleteAction
): ProductDeleteState => {
    if (action.type === ProductDeleteActionTypes.PRODUCT_DELETE_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS) {
        return { ...state, isLoading: false, success: true, error: null };
    }

    if (action.type === ProductDeleteActionTypes.PRODUCT_DELETE_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    return state;
};

export { productDeleteReducer };
