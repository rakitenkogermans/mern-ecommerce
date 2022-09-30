import {
    ProductCreateReviewAction,
    ProductCreateReviewActionTypes,
    ProductCreateReviewState,
} from '../../types/products/productCreateReview';

const productCreateReviewInitialState: ProductCreateReviewState = {
    isLoading: false,
    success: false,
    error: null,
};

const productReviewCreateReducer = (
    state = productCreateReviewInitialState,
    action: ProductCreateReviewAction
): ProductCreateReviewState => {
    if (action.type === ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS) {
        return { ...state, isLoading: false, success: true, error: null };
    }

    if (action.type === ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    if (action.type === ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET) {
        return productCreateReviewInitialState;
    }

    return state;
};

export { productReviewCreateReducer };
