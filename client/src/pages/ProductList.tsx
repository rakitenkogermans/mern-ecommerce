import { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Paginate } from '../components/Paginate';
import { ShowPerPage } from '../components/ShowPerPage';

type ProductListProps = {};

const ProductList: FC<ProductListProps> = () => {
    const navigate = useNavigate();
    const { userInfo } = useTypedSelector((state) => state.user);
    const { products, isLoading, error, page, pages, perPage } = useTypedSelector(
        (state) => state.productList
    );
    const {
        success: successDelete,
        isLoading: isLoadingDelete,
        error: errorDelete,
    } = useTypedSelector((state) => state.productDelete);
    const {
        success: successCreate,
        product: createdProduct,
        isLoading: isLoadingCreate,
        error: errorCreate,
    } = useTypedSelector((state) => state.productCreate);
    const {
        listProducts,
        deleteProduct,
        createProduct,
        createProductReset,
        changeProductPage,
        changeProductPerPage,
    } = useActions();

    useEffect(() => {
        if (successDelete) {
            listProducts('', page, perPage);
        }
    }, [successDelete]);

    useEffect(() => {
        if (!(userInfo && userInfo.isAdmin)) {
            navigate('/login');
            return;
        }
        if (successCreate && createdProduct) {
            navigate(`/admin/product/${createdProduct._id}/edit`);
            return;
        }
        // createProductReset();
        listProducts('', page, perPage);
        return () => {
            createProductReset();
        };
    }, [userInfo, navigate, successCreate, createdProduct, page, perPage]);

    const deleteHandler = (id: string) => {
        deleteProduct(id);
    };

    const createProductHandler = () => {
        createProduct();
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="d-flex flex-row align-items-center justify-content-end gap-4">
                    <Button className="my-3" onClick={createProductHandler}>
                        <FaPlus /> Create Product
                    </Button>
                    <ShowPerPage
                        text="Show Per Page"
                        optionsArray={[4, 8, 16, 32]}
                        variant="light"
                        changePerPage={changeProductPerPage}
                    />
                </Col>
            </Row>
            {isLoadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {isLoadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <Form.Group className="d-flex justify-content-evenly">
                                            <NavLink to={`/admin/product/${product._id}/edit`}>
                                                <Button
                                                    className="btn btn-primary btn-sm"
                                                    variant="info"
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </NavLink>
                                            <Form.Group>
                                                <Button
                                                    className="btn btn-primary btn-sm"
                                                    variant="danger"
                                                    onClick={deleteHandler.bind(null, product._id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </Form.Group>
                                        </Form.Group>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} changePage={changeProductPage} />
                </>
            )}
        </>
    );
};

export { ProductList };
