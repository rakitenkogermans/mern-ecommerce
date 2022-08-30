import { ProductListAction, ProductListActionTypes, ProductType } from '../../@types/products';
import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';

export const listProducts = () => async (dispatch: Dispatch<ProductListAction>) => {
    dispatch({ type: ProductListActionTypes.PRODUCT_LIST_BEGIN });
    try {
        const { data } = await axios.get<ProductType[]>('/api/products');
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
