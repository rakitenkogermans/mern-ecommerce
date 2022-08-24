import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Rating } from './Rating';

type ProductProps = {
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

const Product: FC<ProductProps> = ({ id, image, name, numReviews, price, rating }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${id}`}>
                <Card.Img src={image} variant="top" />
            </a>
            <Card.Body>
                <a href={`/product/${id}`} className="text-decoration-none">
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="div">
                    <Rating value={rating} text={`${numReviews} reviews`} totalStars={5} />
                </Card.Text>
                <Card.Text as="h3">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export { Product };
