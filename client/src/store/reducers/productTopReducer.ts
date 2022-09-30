import {
    ProductTopAction,
    ProductTopActionTypes,
    ProductTopState,
} from '../../types/products/productTop';

const productTopInitialState: ProductTopState = {
    isLoading: false,
    products: [],
    error: null,
};

const productTopReducer = (
    state = productTopInitialState,
    action: ProductTopAction
): ProductTopState => {
    if (action.type === ProductTopActionTypes.PRODUCT_TOP_BEGIN) {
        return { ...state, isLoading: true, error: null, products: [] };
    }

    if (action.type === ProductTopActionTypes.PRODUCT_TOP_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            products: action.payload.products,
            error: null,
        };
    }

    if (action.type === ProductTopActionTypes.PRODUCT_TOP_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    return state;
};

export { productTopReducer };
