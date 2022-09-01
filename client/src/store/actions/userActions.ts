import { Dispatch } from 'redux';
import { UserAction, UserActionTypes } from '../../@types/user/user';
import axios, { AxiosError } from 'axios';
import { UserType } from '../../@types/user';
import { saveToLocalstorage } from '../../utils/localstorage';
import { LocalstorageKeys } from '../../@types/localstorage';

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

export { login };
