import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';
import { orderCreateReducer } from './orderCreateReducer';
import { orderDetailsReducer } from './orderDetailsReducer';
import { orderPayReducer } from './orderPayReducer';

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
