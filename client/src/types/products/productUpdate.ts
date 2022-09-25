type ProductUpdateState = {
    isLoading: boolean;
    success: boolean;
    error: null | string;
};

enum ProductUpdateActionTypes {
    PRODUCT_UPDATE_BEGIN = 'PRODUCT_UPDATE_BEGIN',
    PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS',
    PRODUCT_UPDATE_ERROR = 'PRODUCT_UPDATE_ERROR',
    PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET',
}

type ProductUpdateAction =
    | { type: ProductUpdateActionTypes.PRODUCT_UPDATE_BEGIN }
    | { type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS }
    | { type: ProductUpdateActionTypes.PRODUCT_UPDATE_ERROR; payload: { msg: string } }
    | { type: ProductUpdateActionTypes.PRODUCT_UPDATE_RESET };

export { ProductUpdateActionTypes, ProductUpdateAction, ProductUpdateState };
