import { UserAction, UserActionTypes, UserState } from '../../types/user/user';
import { UserType } from '../../types/user';
import { LocalstorageKeys } from '../../types/localstorage';
import { getFromLocalstorage } from '../../utils/localstorage';

const userInfoFromStorage: UserType = getFromLocalstorage(LocalstorageKeys.USER_INFO);

const userInitialState: UserState = {
    isLoading: false,
    userInfo: userInfoFromStorage ? userInfoFromStorage : null,
    error: null,
    success: false,
};

const userReducer = (state = userInitialState, action: UserAction): UserState => {
    if (action.type === UserActionTypes.USER_LOGIN_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === UserActionTypes.USER_LOGIN_SUCCESS) {
        return { ...state, isLoading: false, userInfo: action.payload.user, error: null };
    }

    if (action.type === UserActionTypes.USER_LOGIN_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    if (action.type === UserActionTypes.USER_LOGOUT) {
        return { ...state, isLoading: false, error: null, userInfo: null, success: false };
    }

    if (action.type === UserActionTypes.USER_REGISTER_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === UserActionTypes.USER_REGISTER_SUCCESS) {
        return { ...state, isLoading: false, userInfo: action.payload.user, error: null };
    }

    if (action.type === UserActionTypes.USER_REGISTER_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    if (action.type === UserActionTypes.USER_PROFILE_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === UserActionTypes.USER_PROFILE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            userInfo: {
                _id: state.userInfo?._id || '',
                token: state.userInfo?.token || '',
                name: action.payload.user.name,
                email: action.payload.user.email,
                isAdmin: action.payload.user.isAdmin,
            },
            error: null,
        };
    }

    if (action.type === UserActionTypes.USER_PROFILE_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    if (action.type === UserActionTypes.USER_UPDATE_PROFILE_BEGIN) {
        return { ...state, isLoading: true, error: null, success: false };
    }

    if (action.type === UserActionTypes.USER_UPDATE_PROFILE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            userInfo: action.payload.user,
            error: null,
            success: true,
        };
    }

    if (action.type === UserActionTypes.USER_UPDATE_PROFILE_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg, success: false };
    }

    return state;
};

export { userReducer };
