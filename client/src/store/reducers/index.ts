import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';
import { productDetailsReducer } from './productDetailsReducer';

export const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
