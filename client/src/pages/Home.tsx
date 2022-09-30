import { FC, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductCard } from '../components/ProductCard';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useParams } from 'react-router-dom';
import { Paginate } from '../components/Paginate';
import { ShowPerPage } from '../components/ShowPerPage';
import { ProductCarousel } from '../components/ProductCarousel';

type HomeProps = {};

const Home: FC<HomeProps> = () => {
    const { keyword } = useParams();
    const { listProducts, changeProductPage, changeProductPerPage } = useActions();
    const { products, isLoading, error, page, pages, perPage } = useTypedSelector(
        (state) => state.productList
    );

    useEffect(() => {
        listProducts(keyword || '', page, perPage);
    }, [keyword, page, perPage]);

    return (
        <>
            {!keyword && <ProductCarousel />}
            <div className="d-flex flex-row align-items-center justify-content-between">
                <h1>Latest Products</h1>
                <ShowPerPage
                    text="Show Per Page"
                    optionsArray={[4, 8, 16, 32]}
                    variant="light"
                    changePerPage={changeProductPerPage}
                />
            </div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
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
                    <Row>
                        <Col>
                            <Paginate page={page} pages={pages} changePage={changeProductPage} />
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export { Home };
