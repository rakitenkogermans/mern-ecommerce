import {
    OrderDetailsActionTypes,
    OrderDetailsAction,
    OrderDetailsState,
} from '../../@types/order/orderDetails';

const orderDetailsInitialState: OrderDetailsState = {
    isLoading: false,
    order: null,
    error: null,
};

const orderDetailsReducer = (state = orderDetailsInitialState, action: OrderDetailsAction) => {
    if (action.type === OrderDetailsActionTypes.ORDER_DETAILS_BEGIN) {
        return { ...state, isLoading: true, success: false };
    }

    if (action.type === OrderDetailsActionTypes.ORDER_DETAILS_SUCCES) {
        return {
            ...state,
            order: action.payload.order,
            isLoading: false,
            error: null,
        };
    }

    if (action.type === OrderDetailsActionTypes.ORDER_DETAILS_ERROR) {
        return { ...state, isLoading: false, success: false, error: action.payload.msg };
    }

    return state;
};

export { orderDetailsReducer };
