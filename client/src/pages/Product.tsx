import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Image, ListGroup, Row, FormSelect, Form } from 'react-bootstrap';
import { Rating } from '../components/Rating';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { date } from '../utils/date';

type ProductProps = {};

const Product: FC<ProductProps> = () => {
    const navigate = useNavigate();
    const { userInfo } = useTypedSelector((state) => state.user);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState('1');
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const { listProductDetails, createProductReview, createProductReviewReset } = useActions();
    const { product, isLoading, error } = useTypedSelector((state) => state.productDetails);
    const {
        isLoading: isLoadingReview,
        error: errorReview,
        success: successReview,
    } = useTypedSelector((state) => state.productReviewCreate);

    useEffect(() => {
        if (successReview) {
            setRating('1');
            setComment('');
        }

        if (!product?._id || product._id !== id) {
            createProductReviewReset();
        }

        listProductDetails(id || '');

        return () => {
            createProductReviewReset();
        };
    }, [successReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${quantity}`);
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createProductReview(
            {
                rating,
                comment,
            },
            id || ''
        );
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
                product && (
                    <>
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
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
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
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out Of Stock'}
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
                                                        onChange={(
                                                            e: ChangeEvent<HTMLSelectElement>
                                                        ) => setQuantity(Number(e.target.value))}
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
                        <Row>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews?.length === 0 && <Message>No Reviews</Message>}
                                <ListGroup variant="flush">
                                    {product.reviews?.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} text="" />
                                            <p>{date(review.createdAt)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h2>Write a Customer Review</h2>
                                        {successReview && (
                                            <Message variant="success">
                                                Review submitted successfully
                                            </Message>
                                        )}
                                        {isLoadingReview && <Loader />}
                                        {errorReview && (
                                            <Message variant="danger">{errorReview}</Message>
                                        )}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId="rating">
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={rating}
                                                        onChange={(
                                                            e: ChangeEvent<HTMLInputElement>
                                                        ) => setRating(e.target.value)}
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="1">1 - Poor</option>
                                                        <option value="2">2 - Fair</option>
                                                        <option value="3">3 - Good</option>
                                                        <option value="4">4 - Very Good</option>
                                                        <option value="5">5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="comment">
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        value={comment}
                                                        onChange={(
                                                            e: ChangeEvent<HTMLInputElement>
                                                        ) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Form.Group className="d-grid">
                                                    <Button
                                                        disabled={isLoadingReview}
                                                        type="submit"
                                                        className="btn btn-primary btn-lg my-3"
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form.Group>
                                            </Form>
                                        ) : (
                                            <Message>
                                                Please <Link to="/login">sign in</Link> to write a
                                                review{' '}
                                            </Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )
            )}
        </>
    );
};

export { Product };
