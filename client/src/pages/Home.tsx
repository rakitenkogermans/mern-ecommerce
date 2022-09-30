import { FC, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductCard } from '../components/ProductCard';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useParams } from 'react-router-dom';

type HomeProps = {};

const Home: FC<HomeProps> = () => {
    const { keyword } = useParams();
    const { listProducts } = useActions();
    const { products, isLoading, error } = useTypedSelector((state) => state.productList);

    useEffect(() => {
        listProducts(keyword || '');
    }, [keyword]);

    return (
        <>
            <h1>Latest Products</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductCard
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
            )}
        </>
    );
};

export { Home };
