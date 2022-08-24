import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../data/products';
import { Product } from '../components/Product';

type HomeScreenProps = {};

const HomeScreen: FC<HomeScreenProps> = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            description={product.description}
                            brand={product.brand}
                            category={product.category}
                            price={product.price}
                            countInStock={product.countInStock}
                            rating={product.rating}
                            numReviews={product.numReviews}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export { HomeScreen };
