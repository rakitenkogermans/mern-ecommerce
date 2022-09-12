import { Dispatch } from 'redux';
import { UserAction, UserActionTypes } from '../../types/user/user';
import axios, { AxiosError } from 'axios';
import { UserType } from '../../types/user';
import { removeFromLocalstorage, saveToLocalstorage } from '../../utils/localstorage';
import { LocalstorageKeys } from '../../types/localstorage';
import { RootState } from '../reducers';

const login = (email: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.USER_LOGIN_BEGIN });
    try {
        const { data } = await axios.post<UserType>('/api/users/login', { email, password });
        dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS, payload: { user: data } });
        saveToLocalstorage(LocalstorageKeys.USER_INFO, data);
    } catch (err) {
        if (err instanceof AxiosError)
            dispatch({
                type: UserActionTypes.USER_LOGIN_ERROR,
                payload: {
                    msg:
                        err.response && err.response.data.message
                            ? err.response.data.message
                            : err.message,
                },
            });
    }
};

const logout = () => async (dispatch: Dispatch<UserAction>) => {
    removeFromLocalstorage(LocalstorageKeys.USER_INFO);
    dispatch({ type: UserActionTypes.USER_LOGOUT });
};

const register =
    (name: string, email: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.USER_REGISTER_BEGIN });
        try {
            const { data } = await axios.post<UserType>('/api/users', { name, email, password });
            dispatch({ type: UserActionTypes.USER_REGISTER_SUCCESS, payload: { user: data } });
            saveToLocalstorage(LocalstorageKeys.USER_INFO, data);
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: UserActionTypes.USER_REGISTER_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const getUserProfile =
    (id = 'profile') =>
    async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
        dispatch({ type: UserActionTypes.USER_PROFILE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo!.token}`,
                },
            };

            const { data } = await axios.get<UserType>(`/api/users/${id}`, config);
            dispatch({ type: UserActionTypes.USER_PROFILE_SUCCESS, payload: { user: data } });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: UserActionTypes.USER_PROFILE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

const updateUserProfile =
    (user: UserType & { password?: string }) =>
    async (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
        dispatch({ type: UserActionTypes.USER_UPDATE_PROFILE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo!.token}`,
                },
            };

            const { data } = await axios.put<UserType>('/api/users/profile', user, config);
            dispatch({
                type: UserActionTypes.USER_UPDATE_PROFILE_SUCCESS,
                payload: { user: data },
            });
            saveToLocalstorage(LocalstorageKeys.USER_INFO, data);
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: UserActionTypes.USER_PROFILE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

export { login, logout, register, getUserProfile, updateUserProfile };
