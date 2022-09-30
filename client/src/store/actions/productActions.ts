import { ProductListAction, ProductListActionTypes } from '../../types/products/productList';
import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { ProductType } from '../../types/products';
import {
    ProductDetailsAction,
    ProductDetailsActionTypes,
} from '../../types/products/productDetails';

const listProducts = (keyword: string) => async (dispatch: Dispatch<ProductListAction>) => {
    dispatch({ type: ProductListActionTypes.PRODUCT_LIST_BEGIN });
    try {
        const { data } = await axios.get<ProductType[]>('/api/products', { params: { keyword } });
        dispatch({
            type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
            payload: { products: data },
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

export { listProducts, listProductDetails };
