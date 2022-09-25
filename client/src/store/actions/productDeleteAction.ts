import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import axios, { AxiosError } from 'axios';
import { ProductDeleteAction, ProductDeleteActionTypes } from '../../types/products/productDelete';

const deleteProduct =
    (id: string) => async (dispatch: Dispatch<ProductDeleteAction>, getState: () => RootState) => {
        dispatch({ type: ProductDeleteActionTypes.PRODUCT_DELETE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            await axios.delete(`/api/products/${id}`, config);
            dispatch({ type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: ProductDeleteActionTypes.PRODUCT_DELETE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

export { deleteProduct };
