import { Dispatch } from 'redux';
import { ProductCreateAction, ProductCreateActionTypes } from '../../types/products/productCreate';
import axios, { AxiosError } from 'axios';
import { ProductType } from '../../types/products';
import { RootState } from '../reducers';

const createProduct =
    () => async (dispatch: Dispatch<ProductCreateAction>, getState: () => RootState) => {
        dispatch({ type: ProductCreateActionTypes.PRODUCT_CREATE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            const { data } = await axios.post<ProductType>('/api/products/', {}, config);
            dispatch({
                type: ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS,
                payload: { product: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: ProductCreateActionTypes.PRODUCT_CREATE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const createProductReset = () => async (dispatch: Dispatch<ProductCreateAction>) => {
    dispatch({ type: ProductCreateActionTypes.PRODUCT_CREATE_RESET });
};

export { createProduct, createProductReset };
