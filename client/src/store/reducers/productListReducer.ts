import {
    ProductListAction,
    ProductListActionTypes,
    ProductListState,
} from '../../types/products/productList';

const productListInitialState: ProductListState = {
    isLoading: false,
    products: [],
    error: null,
    page: 1,
    pages: 0,
    perPage: 4,
};

const productListReducer = (
    state = productListInitialState,
    action: ProductListAction
): ProductListState => {
    if (action.type === ProductListActionTypes.PRODUCT_LIST_BEGIN) {
        return { ...state, isLoading: true, error: null };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            products: action.payload.products,
            page: action.payload.page,
            pages: action.payload.pages,
            error: null,
        };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_PAGE) {
        return { ...state, page: action.payload.page };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_PER_PAGE) {
        return { ...state, perPage: action.payload.perPage };
    }

    if (action.type === ProductListActionTypes.PRODUCT_LIST_RESET) {
        return productListInitialState;
    }

    return state;
};

export { productListReducer };
