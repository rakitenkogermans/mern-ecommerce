import { ProductUpdateAction, ProductUpdateActionTypes } from '../../types/products/productUpdate';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import axios, { AxiosError } from 'axios';
import { ProductType } from '../../types/products';

const updateProduct =
    (product: ProductType) =>
    async (dispatch: Dispatch<ProductUpdateAction>, getState: () => RootState) => {
        dispatch({ type: ProductUpdateActionTypes.PRODUCT_UPDATE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            await axios.put<ProductType>(`/api/products/${product._id}`, product, config);
            dispatch({
                type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: ProductUpdateActionTypes.PRODUCT_UPDATE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const updateProductReset = () => async (dispatch: Dispatch<ProductUpdateAction>) => {
    dispatch({ type: ProductUpdateActionTypes.PRODUCT_UPDATE_RESET });
};
export { updateProduct, updateProductReset };
