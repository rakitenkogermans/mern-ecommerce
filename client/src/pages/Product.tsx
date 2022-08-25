import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Rating } from '../components/Rating';
import { ProductType } from '../@types/products';
import axios from 'axios';

type ProductProps = {};

const Product: FC<ProductProps> = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<ProductType>({} as ProductType);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                const { data } = await axios.get<ProductType>(`/api/products/${id}`);
                setProduct(data);
            };
            fetchProduct();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
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
                                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
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
        </>
    );
};

export { Product };
