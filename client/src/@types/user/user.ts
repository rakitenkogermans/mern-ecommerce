import { UserType } from './index';

type UserState = { isLoading: boolean; userInfo: UserType; error: null | string };

enum UserActionTypes {
    USER_LOGIN_BEGIN = 'USER_LOGIN_BEGIN',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
    USER_LOGOUT = 'USER_LOGOUT',
}

type UserAction =
    | { type: UserActionTypes.USER_LOGIN_BEGIN }
    | { type: UserActionTypes.USER_LOGIN_SUCCESS; payload: { user: UserType } }
    | { type: UserActionTypes.USER_LOGIN_ERROR; payload: { msg: string } }
    | { type: UserActionTypes.USER_LOGOUT };

export { UserActionTypes, UserAction, UserState };
