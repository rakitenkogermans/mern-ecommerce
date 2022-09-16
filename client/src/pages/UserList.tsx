import { FC, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Button, Table, Form } from 'react-bootstrap';
import { FaTimes, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';

type UserListProps = {};

const UserList: FC<UserListProps> = () => {
    const navigate = useNavigate();
    const { userInfo } = useTypedSelector((state) => state.user);
    const { users, isLoading, error } = useTypedSelector((state) => state.userList);
    const { success: successDelete } = useTypedSelector((state) => state.userDelete);
    const { listUsers, deleteUser } = useActions();

    useEffect(() => {
        if (successDelete) {
            listUsers();
        }
    }, [successDelete]);

    useEffect(() => {
        if (!(userInfo && userInfo.isAdmin)) {
            navigate('/login');
            return;
        }
        listUsers();
    }, [userInfo, navigate]);

    const deleteHandler = (id: string) => {
        deleteUser(id);
    };

    return (
        <>
            <h1>Users</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="red" />
                                    )}
                                </td>
                                <td>
                                    <Form.Group className="d-flex justify-content-evenly">
                                        <NavLink to={`/admin/user/${user._id}/edit`}>
                                            <Button
                                                className="btn btn-primary btn-sm"
                                                variant="info"
                                            >
                                                <FaEdit />
                                            </Button>
                                        </NavLink>
                                        <Form.Group>
                                            <Button
                                                className="btn btn-primary btn-sm"
                                                variant="danger"
                                                onClick={deleteHandler.bind(null, user._id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Form.Group>
                                    </Form.Group>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export { UserList };
