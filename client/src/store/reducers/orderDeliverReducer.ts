import {
    OrderDeliverAction,
    OrderDeliverActionTypes,
    OrderDeliverState,
} from '../../types/order/orderDeliver';

const orderDeliverInitialState: OrderDeliverState = {
    isLoading: false,
    success: false,
    error: null,
};

const orderDeliverReducer = (
    state = orderDeliverInitialState,
    action: OrderDeliverAction
): OrderDeliverState => {
    if (action.type === OrderDeliverActionTypes.ORDER_DELIVER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === OrderDeliverActionTypes.ORDER_DELIVER_SUCCESS) {
        return {
            ...state,
            success: true,
            isLoading: false,
            error: null,
        };
    }

    if (action.type === OrderDeliverActionTypes.ORDER_DELIVER_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    if (action.type === OrderDeliverActionTypes.ORDER_DELIVER_RESET) {
        return orderDeliverInitialState;
    }

    return state;
};

export { orderDeliverReducer };
