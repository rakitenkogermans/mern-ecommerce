import {
    ProductCreateReviewAction,
    ProductCreateReviewActionTypes,
} from '../../types/products/productCreateReview';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import axios, { AxiosError } from 'axios';

const createProductReview =
    (review: { rating: string; comment: string }, id: string) =>
    async (dispatch: Dispatch<ProductCreateReviewAction>, getState: () => RootState) => {
        dispatch({ type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            await axios.post(`/api/products/${id}/reviews`, review, config);
            dispatch({
                type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const createProductReviewReset = () => async (dispatch: Dispatch<ProductCreateReviewAction>) => {
    dispatch({ type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET });
};
export { createProductReview, createProductReviewReset };
