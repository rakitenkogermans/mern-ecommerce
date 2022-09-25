import { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

type ProductListProps = {};

const ProductList: FC<ProductListProps> = () => {
    const navigate = useNavigate();
    const { userInfo } = useTypedSelector((state) => state.user);
    const { products, isLoading, error } = useTypedSelector((state) => state.productList);
    const { success: successDelete } = useTypedSelector((state) => state.productDelete);
    const { listProducts, deleteProduct } = useActions();

    useEffect(() => {
        if (successDelete) {
            listProducts();
        }
    }, [successDelete]);

    useEffect(() => {
        if (!(userInfo && userInfo.isAdmin)) {
            navigate('/login');
            return;
        }
        listProducts();
    }, [userInfo, navigate]);

    const deleteHandler = (id: string) => {
        deleteProduct(id);
    };

    const createProductHandler = () => {
        console.log('p');
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createProductHandler}>
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
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
            )}
        </>
    );
};

export { ProductList };
