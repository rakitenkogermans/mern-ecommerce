import {
    ProductListAction,
    ProductListActionTypes,
    ProductListState,
} from '../../@types/products/productList';

const productListInitialState: ProductListState = { isLoading: false, products: [], error: null };

const productListReducer = (
    state = productListInitialState,
    action: ProductListAction
): ProductListState => {
    if (action.type === ProductListActionTypes.PRODUCT_LIST_BEGIN) {
        return { ...state, isLoading: true, error: null };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_SUCCESS) {
        return { ...state, isLoading: false, products: action.payload.products, error: null };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    return state;
};

export { productListReducer };
