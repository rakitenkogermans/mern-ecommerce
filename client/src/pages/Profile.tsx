import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { NavLink, useNavigate } from 'react-router-dom';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { UserType } from '../types/user';
import { date } from '../utils/date';
import { FaTimes } from 'react-icons/fa';

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
    const { userInfo, isLoading, error, success } = useTypedSelector((state) => state.user);
    const {
        orders,
        isLoading: isLoadingOrders,
        error: errorOrders,
    } = useTypedSelector((state) => state.orderListClient);
    const [name, setName] = useState(userInfo?.name || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const { updateUserProfile, getAllOrdersForClient } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        getAllOrdersForClient();
    }, [navigate, userInfo]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords don't match!");
            return;
        }
        setMessage(null);
        if (userInfo) {
            const user: UserType & { password?: string } = { ...userInfo, name, email };
            if (password.trim().length > 8 && confirmPassword.trim().length > 8) {
                user.password = password;
            }
            updateUserProfile(user);
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Profile Updated</Message>}
                {isLoading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Addres</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className="d-grid">
                        <Button
                            type="submit"
                            className="btn btn-primary btn-lg my-3"
                            disabled={isLoading}
                        >
                            Update
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
            <Col md={9}>
                <h1>My Orders</h1>
                {isLoadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{date(order.createdAt)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        <div>
                                            {order.isPaid ? (
                                                date(order.paidAt)
                                            ) : (
                                                <FaTimes color="red" />
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            date(order.deliveredAt)
                                        ) : (
                                            <FaTimes color="red" />
                                        )}
                                    </td>
                                    <td>
                                        <NavLink to={`/order/${order._id}`}>
                                            <Form.Group className="d-grid">
                                                <Button
                                                    className="btn btn-primary btn-sm"
                                                    variant="info"
                                                >
                                                    Details
                                                </Button>
                                            </Form.Group>
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export { Profile };
