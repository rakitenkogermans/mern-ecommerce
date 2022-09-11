import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import {
    PayPalButtons,
    SCRIPT_LOADING_STATE,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { payOrder, payReset } from '../store/actions/orderActions';

type OrderProps = {};

const Order: FC<OrderProps> = () => {
    const [{ isPending, isResolved }, dispatch] = usePayPalScriptReducer();
    const [isPaid, setIsPaid] = useState(false);
    const { id } = useParams();
    const { getOrderDetails } = useActions();
    const { order, isLoading, error } = useTypedSelector((state) => state.orderDetails);
    const { success: successPay, isLoading: isLoadingPay } = useTypedSelector(
        (state) => state.orderPay
    );

    useEffect(() => {
        if (isPaid) {
            payOrder(id || '', {});
        }
    }, [isPaid]);

    useEffect(() => {
        if (!order?.isPaid) {
            dispatch({
                type: 'setLoadingStatus',
                value: SCRIPT_LOADING_STATE.PENDING,
            });
        }
        if (!order || order._id !== id || successPay) {
            payReset();
            getOrderDetails(id || '');
        }
    }, [order, id, successPay]);

    const createOrder = (_: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: 'MERN Ecommerce Project',
                    amount: {
                        currency_code: 'USD',
                        value: order?.totalPrice,
                    },
                },
            ],
        });
    };

    const successPaymentHandler = (_: any, actions: any) => {
        return actions.order.capture().then(function (details: any) {
            setIsPaid(true);
            console.log('pay details', details);
            payOrder(id || '', details);
        });
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : !order ? (
        <Message>No order</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    <>Delivered on {order.deliveredAt}</>
                                </Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    <>Paid on {order.paidAt}</>
                                </Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x ${item.price} = $
                                                    {item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {isLoadingPay && <Loader />}
                                    {isPending ? (
                                        <Loader />
                                    ) : isResolved ? (
                                        <PayPalButtons
                                            style={{ layout: 'horizontal', tagline: false }}
                                            createOrder={createOrder}
                                            onApprove={successPaymentHandler}
                                        />
                                    ) : (
                                        // <PayPalButton
                                        //     amount={order.totalPrice}
                                        //     onSuccess={successPaymentHandler}
                                        // />
                                        <div>Cant load PayPal Button</div>
                                    )}
                                </ListGroup.Item>
                            )}
                            {/*{loadingDeliver && <Loader />}*/}
                            {/*{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (*/}
                            {/*    <ListGroup.Item>*/}
                            {/*        <Button*/}
                            {/*            type="button"*/}
                            {/*            className="btn btn-block"*/}
                            {/*            onClick={deliverHandler}*/}
                            {/*        >*/}
                            {/*            Mark As Delivered*/}
                            {/*        </Button>*/}
                            {/*    </ListGroup.Item>*/}
                            {/*)}*/}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export { Order };
