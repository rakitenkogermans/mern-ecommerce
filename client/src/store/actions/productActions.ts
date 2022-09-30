import { ProductListAction, ProductListActionTypes } from '../../types/products/productList';
import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { ProductPaginationType, ProductType } from '../../types/products';
import {
    ProductDetailsAction,
    ProductDetailsActionTypes,
} from '../../types/products/productDetails';

const listProducts =
    (keyword: string, pageNumber: number, perPageNumber: number) =>
    async (dispatch: Dispatch<ProductListAction>) => {
        dispatch({ type: ProductListActionTypes.PRODUCT_LIST_BEGIN });
        try {
            const { data } = await axios.get<ProductPaginationType>('/api/products', {
                params: { keyword, pageNumber, perPage: perPageNumber },
            });
            dispatch({
                type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
                payload: { products: data.products, page: data.page, pages: data.pages },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: ProductListActionTypes.PRODUCT_LIST_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const listProductsReset = () => async (dispatch: Dispatch<ProductListAction>) => {
    dispatch({ type: ProductListActionTypes.PRODUCT_LIST_RESET });
};

const changeProductPage = (pageNumber: number) => async (dispatch: Dispatch<ProductListAction>) => {
    dispatch({ type: ProductListActionTypes.PRODUCT_LIST_PAGE, payload: { page: pageNumber } });
};

const changeProductPerPage =
    (perPageNumber: number) => async (dispatch: Dispatch<ProductListAction>) => {
        dispatch({
            type: ProductListActionTypes.PRODUCT_LIST_PER_PAGE,
            payload: { perPage: perPageNumber },
        });
    };

const listProductDetails = (id: string) => async (dispatch: Dispatch<ProductDetailsAction>) => {
    dispatch({ type: ProductDetailsActionTypes.PRODUCT_DETAILS_BEGIN });
    try {
        const { data } = await axios.get<ProductType>(`/api/products/${id}`);
        dispatch({
            type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS,
            payload: { product: data },
        });
    } catch (err) {
        if (err instanceof AxiosError)
            dispatch({
                type: ProductDetailsActionTypes.PRODUCT_DETAILS_ERROR,
                payload: {
                    msg:
                        err.response && err.response.data.message
                            ? err.response.data.message
                            : err.message,
                },
            });
    }
};

export {
    listProducts,
    listProductDetails,
    changeProductPage,
    listProductsReset,
    changeProductPerPage,
};
