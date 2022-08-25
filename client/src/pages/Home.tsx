import { FC, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductCard } from '../components/ProductCard';
import { ProductType } from '../@types/products';
import axios from 'axios';

type HomeProps = {};

const Home: FC<HomeProps> = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const { data } = await axios.get<ProductType[]>('/api/products');
                setProducts(data);
            };
            fetchProducts();
        } catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <>
            <h1>Latest Products</h1>
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
        </>
    );
};

export { Home };
