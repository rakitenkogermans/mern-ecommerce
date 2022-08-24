import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Rating } from './Rating';

type ProductCardProps = {
    id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
};

const ProductCard: FC<ProductCardProps> = ({ id, image, name, numReviews, price, rating }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <NavLink to={`/product/${id}`}>
                <Card.Img src={image} variant="top" />
            </NavLink>
            <Card.Body>
                <NavLink to={`/product/${id}`} className="text-decoration-none">
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                </NavLink>
                <Card.Text as="div">
                    <Rating value={rating} text={`${numReviews} reviews`} totalStars={5} />
                </Card.Text>
                <Card.Text as="h3">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export { ProductCard };
