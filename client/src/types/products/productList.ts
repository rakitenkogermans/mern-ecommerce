import { ProductType } from './index';

type ProductListState = {
    isLoading: boolean;
    products: ProductType[];
    error: null | string;
    page: number;
    pages: number;
    perPage: number;
};

enum ProductListActionTypes {
    PRODUCT_LIST_BEGIN = 'PRODUCT_LIST_BEGIN',
    PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_ERROR = 'PRODUCT_LIST_ERROR',
    PRODUCT_LIST_PAGE = 'PRODUCT_LIST_PAGE',
    PRODUCT_LIST_PER_PAGE = 'PRODUCT_LIST_PER_PAGE',
    PRODUCT_LIST_RESET = 'PRODUCT_LIST_RESET',
}

type ProductListAction =
    | { type: ProductListActionTypes.PRODUCT_LIST_BEGIN }
    | {
          type: ProductListActionTypes.PRODUCT_LIST_SUCCESS;
          payload: { products: ProductType[]; page: number; pages: number };
      }
    | { type: ProductListActionTypes.PRODUCT_LIST_ERROR; payload: { msg: string } }
    | { type: ProductListActionTypes.PRODUCT_LIST_PAGE; payload: { page: number } }
    | { type: ProductListActionTypes.PRODUCT_LIST_PER_PAGE; payload: { perPage: number } }
    | { type: ProductListActionTypes.PRODUCT_LIST_RESET };

export { ProductListState, ProductListAction, ProductListActionTypes };
