import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import axios, { AxiosError } from 'axios';
import { Order, OrderDetails } from '../../types/order';
import { OrderCreateAction, OrderCreateActionTypes } from '../../types/order/orderCreate';
import { CartType, ShippingType } from '../../types/cart';
import { OrderDetailsAction, OrderDetailsActionTypes } from '../../types/order/orderDetails';
import { OrderPayAction, OrderPayActionTypes } from '../../types/order/orderPay';
import { OrderResponseBody } from '@paypal/paypal-js';
import {
    OrderListClientAction,
    OrderListClientActionTypes,
} from '../../types/order/orderListClient';
import { OrderListAction, OrderListActionTypes } from '../../types/order/orderList';

const createOrder =
    (order: {
        orderItems: CartType[];
        shippingAddress: ShippingType | null;
        paymentMethod: string;
        itemsPrice: number;
        taxPrice: number;
        shippingPrice: number;
        totalPrice: number;
    }) =>
    async (dispatch: Dispatch<OrderCreateAction>, getState: () => RootState) => {
        dispatch({ type: OrderCreateActionTypes.ORDER_CREATE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            const { data } = await axios.post<Order>('/api/orders', order, config);
            dispatch({
                type: OrderCreateActionTypes.ORDER_CREATE_SUCCESS,
                payload: { order: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: OrderCreateActionTypes.ORDER_CREATE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const getOrderDetails =
    (id: string) => async (dispatch: Dispatch<OrderDetailsAction>, getState: () => RootState) => {
        dispatch({ type: OrderDetailsActionTypes.ORDER_DETAILS_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            const { data } = await axios.get<OrderDetails>(`/api/orders/${id}`, config);
            dispatch({
                type: OrderDetailsActionTypes.ORDER_DETAILS_SUCCESS,
                payload: { order: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: OrderDetailsActionTypes.ORDER_DETAILS_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const payOrder =
    (id: string, paymentResult: OrderResponseBody) =>
    async (dispatch: Dispatch<OrderPayAction>, getState: () => RootState) => {
        console.log('in payOrder function');
        dispatch({ type: OrderPayActionTypes.ORDER_PAY_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            const { data } = await axios.put<OrderDetails>(
                `/api/orders/${id}/pay`,
                paymentResult,
                config
            );
            console.log('pay data', data);

            dispatch({
                type: OrderPayActionTypes.ORDER_PAY_SUCCESS,
                payload: { order: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: OrderPayActionTypes.ORDER_PAY_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const payReset = () => async (dispatch: Dispatch<OrderPayAction>) =>
    dispatch({ type: OrderPayActionTypes.ORDER_PAY_RESET });

const getAllOrdersForClient =
    () => async (dispatch: Dispatch<OrderListClientAction>, getState: () => RootState) => {
        dispatch({ type: OrderListClientActionTypes.ORDER_LIST_CLIENT_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            const { data } = await axios.get<OrderDetails[]>('/api/orders/allorders', config);
            dispatch({
                type: OrderListClientActionTypes.ORDER_LIST_CLIENT_SUCCESS,
                payload: { orders: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: OrderListClientActionTypes.ORDER_LIST_CLIENT_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const getAllOrders =
    () => async (dispatch: Dispatch<OrderListAction>, getState: () => RootState) => {
        dispatch({ type: OrderListActionTypes.ORDER_LIST_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            const { data } = await axios.get<OrderDetails[]>('/api/orders', config);
            dispatch({
                type: OrderListActionTypes.ORDER_LIST_SUCCESS,
                payload: { orders: data },
            });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: OrderListActionTypes.ORDER_LIST_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

export { createOrder, getOrderDetails, payOrder, payReset, getAllOrdersForClient, getAllOrders };
