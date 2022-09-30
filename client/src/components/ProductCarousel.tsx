import { FC, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Loader } from './Loader';
import { Message } from './Message';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type ProductCarouselProps = {};

const ProductCarousel: FC<ProductCarouselProps> = () => {
    const { products, isLoading, error } = useTypedSelector((state) => state.productTop);
    const { listTopProducts } = useActions();

    useEffect(() => {
        listTopProducts();
    }, []);

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-light" variant="dark">
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            className="d-flex mx-auto"
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h2>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export { ProductCarousel };
