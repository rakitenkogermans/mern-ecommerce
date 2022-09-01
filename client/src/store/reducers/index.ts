import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
