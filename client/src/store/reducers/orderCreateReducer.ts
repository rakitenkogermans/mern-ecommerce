import {
    OrderCreateAction,
    OrderCreateActionTypes,
    OrderCreateState,
} from '../../@types/order/orderCreate';

const orderInitialState: OrderCreateState = {
    isLoading: false,
    success: false,
    order: null,
    error: null,
};

const orderCreateReducer = (state = orderInitialState, action: OrderCreateAction) => {
    if (action.type === OrderCreateActionTypes.ORDER_CREATE_BEGIN) {
        return { ...state, isLoading: true, success: false };
    }

    if (action.type === OrderCreateActionTypes.ORDER_CREATE_SUCCES) {
        return {
            ...state,
            order: action.payload.order,
            isLoading: false,
            success: true,
            error: null,
        };
    }

    if (action.type === OrderCreateActionTypes.ORDER_CREATE_ERROR) {
        return { ...state, isLoading: false, success: false, error: action.payload.msg };
    }

    return state;
};

export { orderCreateReducer };
