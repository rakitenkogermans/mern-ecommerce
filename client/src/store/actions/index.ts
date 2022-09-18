import * as ProductActionCreators from './productActions';
import * as CartActionCreators from './cartActions';
import * as UserActionCreators from './userActions';
import * as OrderActionCreators from './orderActions';
import * as UserListActionCreators from './userListActions';
import * as UserDeleteActionCreators from './userDeleteActions';
import * as UserDetailsActionCreators from './userDetailsActions';

export const ActionCreators = {
    ...ProductActionCreators,
    ...CartActionCreators,
    ...UserActionCreators,
    ...UserListActionCreators,
    ...UserDeleteActionCreators,
    ...UserDetailsActionCreators,
    ...OrderActionCreators,
};
