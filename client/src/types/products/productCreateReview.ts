type ProductCreateReviewState = {
    isLoading: boolean;
    success: boolean;
    error: null | string;
};

enum ProductCreateReviewActionTypes {
    PRODUCT_CREATE_REVIEW_BEGIN = 'PRODUCT_CREATE_REVIEW_BEGIN',
    PRODUCT_CREATE_REVIEW_SUCCESS = 'PRODUCT_CREATE_REVIEW_SUCCESS',
    PRODUCT_CREATE_REVIEW_ERROR = 'PRODUCT_CREATE_REVIEW_ERROR',
    PRODUCT_CREATE_REVIEW_RESET = 'PRODUCT_CREATE_REVIEW_RESET',
}

type ProductCreateReviewAction =
    | { type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_BEGIN }
    | { type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS }
    | { type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_ERROR; payload: { msg: string } }
    | { type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET };

export { ProductCreateReviewActionTypes, ProductCreateReviewAction, ProductCreateReviewState };
