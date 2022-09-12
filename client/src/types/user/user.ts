import { UserType } from './index';

type UserState = {
    isLoading: boolean;
    userInfo: UserType | null;
    error: null | string;
    success: boolean;
};

enum UserActionTypes {
    USER_LOGIN_BEGIN = 'USER_LOGIN_BEGIN',
    USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
    USER_LOGOUT = 'USER_LOGOUT',
    USER_REGISTER_BEGIN = 'USER_REGISTER_BEGIN',
    USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
    USER_REGISTER_ERROR = 'USER_REGISTER_ERROR',
    USER_PROFILE_BEGIN = 'USER_PROFILE_BEGIN',
    USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS',
    USER_PROFILE_ERROR = 'USER_PROFILE_ERROR',
    USER_UPDATE_PROFILE_BEGIN = 'USER_UPDATE_PROFILE_BEGIN',
    USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS',
    USER_UPDATE_PROFILE_ERROR = 'USER_UPDATE_PROFILE_ERROR',
    USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET',
}

type UserAction =
    | { type: UserActionTypes.USER_LOGIN_BEGIN }
    | { type: UserActionTypes.USER_LOGIN_SUCCESS; payload: { user: UserType } }
    | { type: UserActionTypes.USER_LOGIN_ERROR; payload: { msg: string } }
    | { type: UserActionTypes.USER_LOGOUT }
    | { type: UserActionTypes.USER_REGISTER_BEGIN }
    | { type: UserActionTypes.USER_REGISTER_SUCCESS; payload: { user: UserType } }
    | { type: UserActionTypes.USER_REGISTER_ERROR; payload: { msg: string } }
    | { type: UserActionTypes.USER_PROFILE_BEGIN }
    | { type: UserActionTypes.USER_PROFILE_SUCCESS; payload: { user: UserType } }
    | { type: UserActionTypes.USER_PROFILE_ERROR; payload: { msg: string } }
    | { type: UserActionTypes.USER_UPDATE_PROFILE_BEGIN }
    | { type: UserActionTypes.USER_UPDATE_PROFILE_SUCCESS; payload: { user: UserType } }
    | { type: UserActionTypes.USER_UPDATE_PROFILE_ERROR; payload: { msg: string } };

export { UserActionTypes, UserAction, UserState };
