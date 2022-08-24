import { FC } from 'react';
import products from '../data/products';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Rating } from '../components/Rating';

type ProductProps = {};

const Product: FC<ProductProps> = () => {
    const { id } = useParams();
    const { name, numReviews, image, rating, price, description, countInStock } = products.find(
        (p) => p._id === id
    )!;
    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={image} alt={name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={rating} text={`${numReviews} reviews`} totalStars={5} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: {price}</ListGroup.Item>
                        <ListGroup.Item>Description: {description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>{price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                className="btn-block"
                                type="button"
                                disabled={countInStock === 0}
                            >
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export { Product };
