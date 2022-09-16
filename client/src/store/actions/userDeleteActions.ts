import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import axios, { AxiosError } from 'axios';
import { UserDeleteAction, UserDeleteActionTypes } from '../../types/user/userDelete';

const deleteUser =
    (id: string) => async (dispatch: Dispatch<UserDeleteAction>, getState: () => RootState) => {
        dispatch({ type: UserDeleteActionTypes.USER_DELETE_BEGIN });
        try {
            const { userInfo } = getState().user;

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            await axios.delete(`/api/users/${id}`, config);
            dispatch({ type: UserDeleteActionTypes.USER_DELETE_SUCCESS });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: UserDeleteActionTypes.USER_DELETE_ERROR,
                    payload: {
                        msg:
                            err.response && err.response.data.message
                                ? err.response.data.message
                                : err.message,
                    },
                });
        }
    };

export { deleteUser };
