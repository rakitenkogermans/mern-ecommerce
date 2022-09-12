import {
    OrderListClientAction,
    OrderListClientActionTypes,
    OrderListClientState,
} from '../../types/order/orderListClient';

const orderListClientInitialState: OrderListClientState = {
    isLoading: false,
    orders: [],
    error: null,
};

const orderListClientReducer = (
    state = orderListClientInitialState,
    action: OrderListClientAction
): OrderListClientState => {
    if (action.type === OrderListClientActionTypes.ORDER_LIST_CLIENT_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === OrderListClientActionTypes.ORDER_LIST_CLIENT_SUCCESS) {
        return {
            ...state,
            orders: action.payload.orders,
            isLoading: false,
            error: null,
        };
    }

    if (action.type === OrderListClientActionTypes.ORDER_LIST_CLIENT_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    return state;
};

export { orderListClientReducer };
