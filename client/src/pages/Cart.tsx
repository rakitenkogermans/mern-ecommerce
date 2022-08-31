import { ChangeEvent, FC, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Button, Card, Col, FormSelect, Image, ListGroup, Row } from 'react-bootstrap';
import { Message } from '../components/Message';
import { FaTrash } from 'react-icons/fa';

type CartProps = {};

const Cart: FC<CartProps> = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const qty = Number(searchParams.get('qty')) || 1;
    const { addToCart } = useActions();
    const { cartItems } = useTypedSelector((state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            addToCart(id, qty);
        }
    }, [id, qty]);

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const removeFromCartHandler = (id: string) => {
        console.log(id);
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty! <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>{item.price}</Col>
                                    <Col md={2}>
                                        <FormSelect
                                            as="select"
                                            value={item.qty}
                                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                                addToCart(item.product, Number(e.target.value))
                                            }
                                        >
                                            {[
                                                ...Array.from(
                                                    { length: item.countInStock },
                                                    (_, index) => index
                                                ),
                                            ].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </FormSelect>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({totalItems}) items</h2>${totalPrice}
                        </ListGroup.Item>
                        <ListGroup.Item className="d-grid">
                            <Button
                                type="button"
                                className="btn btn-primary btn-lg"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>{' '}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export { Cart };
