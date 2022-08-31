import * as ProductActionCreators from './productActions';
import * as CartActionCreators from './cartActions';

export const ActionCreators = { ...ProductActionCreators, ...CartActionCreators };
