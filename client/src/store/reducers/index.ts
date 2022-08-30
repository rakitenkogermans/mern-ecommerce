import { combineReducers } from 'redux';
import { productListReducer } from './productListReducer';

export const rootReducer = combineReducers({ productList: productListReducer });

export type RootState = ReturnType<typeof rootReducer>;
