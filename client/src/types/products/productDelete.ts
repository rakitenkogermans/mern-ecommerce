type ProductDeleteState = {
    isLoading: boolean;
    success: boolean;
    error: null | string;
};

enum ProductDeleteActionTypes {
    PRODUCT_DELETE_BEGIN = 'PRODUCT_DELETE_BEGIN',
    PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS',
    PRODUCT_DELETE_ERROR = 'PRODUCT_DELETE_ERROR',
}

type ProductDeleteAction =
    | { type: ProductDeleteActionTypes.PRODUCT_DELETE_BEGIN }
    | { type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS }
    | { type: ProductDeleteActionTypes.PRODUCT_DELETE_ERROR; payload: { msg: string } };

export { ProductDeleteActionTypes, ProductDeleteAction, ProductDeleteState };
