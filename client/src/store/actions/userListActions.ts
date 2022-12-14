import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { UserListType } from '../../types/user';
import { UserListActionTypes, UserListAction } from '../../types/user/userList';
import { RootState } from '../reducers';

const listUsers = () => async (dispatch: Dispatch<UserListAction>, getState: () => RootState) => {
    dispatch({ type: UserListActionTypes.USER_LIST_BEGIN });
    try {
        const { userInfo } = getState().user;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo && userInfo.token}`,
            },
        };
        const { data } = await axios.get<UserListType[]>('/api/users', config);
        dispatch({ type: UserListActionTypes.USER_LIST_SUCCESS, payload: { users: data } });
    } catch (err) {
        if (err instanceof AxiosError)
            dispatch({
                type: UserListActionTypes.USER_LIST_ERROR,
                payload: {
                    msg:
                        err.response && err.response.data.message
                            ? err.response.data.message
                            : err.message,
                },
            });
    }
};

const listUserReset = () => async (dispatch: Dispatch<UserListAction>) => {
    dispatch({ type: UserListActionTypes.USER_LIST_RESET });
};

export { listUsers, listUserReset };
