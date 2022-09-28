import { OrderListAction, OrderListActionTypes, OrderListState } from '../../types/order/orderList';

const orderListInitialState: OrderListState = {
    isLoading: false,
    orders: [],
    error: null,
};

const orderListReducer = (
    state = orderListInitialState,
    action: OrderListAction
): OrderListState => {
    if (action.type === OrderListActionTypes.ORDER_LIST_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === OrderListActionTypes.ORDER_LIST_SUCCESS) {
        return {
            ...state,
            orders: action.payload.orders,
            isLoading: false,
            error: null,
        };
    }

    if (action.type === OrderListActionTypes.ORDER_LIST_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    return state;
};

export { orderListReducer };
