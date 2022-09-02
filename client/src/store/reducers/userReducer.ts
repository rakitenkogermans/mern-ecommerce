import { UserAction, UserActionTypes, UserState } from '../../@types/user/user';
import { UserType } from '../../@types/user';
import { LocalstorageKeys } from '../../@types/localstorage';
import { getFromLocalstorage } from '../../utils/localstorage';

const userInfoFromStorage: UserType = getFromLocalstorage(LocalstorageKeys.USER_INFO);

const userInitialState: UserState = {
    isLoading: false,
    userInfo: userInfoFromStorage ? userInfoFromStorage : ({} as UserType),
    error: null,
};

const userReducer = (state = userInitialState, action: UserAction): UserState => {
    if (action.type === UserActionTypes.USER_LOGIN_BEGIN) {
        return { ...state, isLoading: true, error: null };
    }

    if (action.type === UserActionTypes.USER_LOGIN_SUCCESS) {
        return { ...state, isLoading: false, userInfo: action.payload.user, error: null };
    }

    if (action.type === UserActionTypes.USER_LOGIN_ERROR) {
        return { ...state, isLoading: false, error: action.payload.msg };
    }

    if (action.type === UserActionTypes.USER_LOGOUT) {
        return { ...state, isLoading: false, error: null, userInfo: {} as UserType };
    }

    return state;
};

export { userReducer };
