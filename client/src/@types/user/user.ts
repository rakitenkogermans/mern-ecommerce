import { UserType } from './index';

type UserState = { isLoading: boolean; userInfo: UserType | null; error: null | string };

enum UserActionTypes {
    USER_LOGIN_BEGIN = 'USER_LOGIN_BEGIN',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
    USER_LOGOUT = 'USER_LOGOUT',
    USER_REGISTER_BEGIN = 'USER_REGISTER_BEGIN',
    USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
    USER_REGISTER_ERROR = 'USER_REGISTER_ERROR',
}

type UserAction =
    | { type: UserActionTypes.USER_LOGIN_BEGIN }
    | { type: UserActionTypes.USER_LOGIN_SUCCESS; payload: { user: UserType } }
    | { type: UserActionTypes.USER_LOGIN_ERROR; payload: { msg: string } }
    | { type: UserActionTypes.USER_LOGOUT }
    | { type: UserActionTypes.USER_REGISTER_BEGIN }
    | { type: UserActionTypes.USER_REGISTER_SUCCESS; payload: { user: UserType } }
    | { type: UserActionTypes.USER_REGISTER_ERROR; payload: { msg: string } };

export { UserActionTypes, UserAction, UserState };
