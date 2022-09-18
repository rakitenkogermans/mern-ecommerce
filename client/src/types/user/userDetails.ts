import { UserListType } from './index';

type UserDetailsState = {
    isLoading: boolean;
    user: UserListType | null;
    error: null | string;
};

enum UserDetailsActionTypes {
    USER_DETAILS_BEGIN = 'USER_DETAILS_BEGIN',
    USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS',
    USER_DETAILS_ERROR = 'USER_DETAILS_ERROR',
    USER_DETAILS_RESET = 'USER_DETAILS_RESET',
}

type UserDetailsAction =
    | { type: UserDetailsActionTypes.USER_DETAILS_BEGIN }
    | { type: UserDetailsActionTypes.USER_DETAILS_SUCCESS; payload: { user: UserListType } }
    | { type: UserDetailsActionTypes.USER_DETAILS_ERROR; payload: { msg: string } }
    | { type: UserDetailsActionTypes.USER_DETAILS_RESET };

export { UserDetailsActionTypes, UserDetailsAction, UserDetailsState };
