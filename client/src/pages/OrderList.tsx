import { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Button, Form, Table } from 'react-bootstrap';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { date } from '../utils/date';

type OrderListProps = {};

const OrderList: FC<OrderListProps> = () => {
    const navigate = useNavigate();
    const { userInfo } = useTypedSelector((state) => state.user);
    const { orders, isLoading, error } = useTypedSelector((state) => state.orderList);
    const { getAllOrders } = useActions();

    useEffect(() => {
        if (!(userInfo && userInfo.isAdmin)) {
            navigate('/login');
            return;
        }
        getAllOrders();
    }, [userInfo, navigate]);

    return (
        <>
            <h1>Orders</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
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
                                <td>{order.user.name}</td>
                                <td>{date(order.createdAt)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? date(order.paidAt) : <FaTimes color="red" />}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        date(order.deliveredAt)
                                    ) : (
                                        <FaTimes color="red" />
                                    )}
                                </td>
                                <td>
                                    <Form.Group className="d-flex justify-content-evenly">
                                        <NavLink to={`/order/${order._id}`}>
                                            <Button
                                                className="btn btn-primary btn-sm"
                                                variant="info"
                                            >
                                                <FaEdit />
                                            </Button>
                                        </NavLink>
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

export { OrderList };
