import { OrderPayAction, OrderPayActionTypes, OrderPayState } from '../../@types/order/orderPay';

const orderPayInitialState: OrderPayState = {
    isLoading: false,
    success: false,
    error: null,
};

const orderPayReducer = (state = orderPayInitialState, action: OrderPayAction): OrderPayState => {
    if (action.type === OrderPayActionTypes.ORDER_PAY_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === OrderPayActionTypes.ORDER_PAY_SUCCESS) {
        return {
            ...state,
            success: true,
            isLoading: false,
            error: null,
        };
    }

    if (action.type === OrderPayActionTypes.ORDER_PAY_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    if (action.type === OrderPayActionTypes.ORDER_PAY_RESET) {
        return orderPayInitialState;
    }

    return state;
};

export { orderPayReducer };
