import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Image, ListGroup, Row, FormSelect } from 'react-bootstrap';
import { Rating } from '../components/Rating';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

type ProductProps = {};

const Product: FC<ProductProps> = () => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { listProductDetails } = useActions();
    const { product, isLoading, error } = useTypedSelector((state) => state.productDetails);

    useEffect(() => {
        listProductDetails(id || '');
    }, []);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${quantity}`);
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                    totalStars={5}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity:</Col>
                                        <Col>
                                            <FormSelect
                                                as="select"
                                                value={quantity}
                                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                                    setQuantity(Number(e.target.value))
                                                }
                                            >
                                                {[
                                                    ...Array.from(
                                                        { length: product.countInStock },
                                                        (_, index) => index
                                                    ),
                                                ].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </FormSelect>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item className="d-grid">
                                <Button
                                    onClick={addToCartHandler}
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </>
    );
};

export { Product };
