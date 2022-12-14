import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { FormContainer } from '../components/FormContainer';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

type ProductEditProps = {};

const ProductEdit: FC<ProductEditProps> = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const { listProductDetails, updateProduct, updateProductReset } = useActions();
    const { userInfo } = useTypedSelector((state) => state.user);
    const {
        success: succesUpdate,
        isLoading: isLoadingUpdate,
        error: errorUpdate,
    } = useTypedSelector((state) => state.productUpdate);
    const {
        product,
        isLoading: isLoadingDetails,
        error: errorDetails,
    } = useTypedSelector((state) => state.productDetails);

    useEffect(() => {
        listProductDetails(id || '');
        return () => {
            updateProductReset();
        };
    }, []);

    useEffect(() => {
        if (!(userInfo && userInfo.isAdmin)) {
            navigate('/login');
            return;
        }

        if (succesUpdate) {
            navigate('/admin/productlist');
            return;
        }

        // if (!product) {
        //     listProductDetails(id || '');
        // }

        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }

        // return () => {
        //     updateProductReset();
        // };
    }, [userInfo, navigate, product, succesUpdate]);

    const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files && e.target.files[0];

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo && userInfo.token}`,
                },
            };

            const { data } = await axios.post<string>('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
        }
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (product) {
            const productUpdate = {
                ...product,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            };
            updateProduct(productUpdate);
        }
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/productlist">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {isLoadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {isLoadingDetails ? (
                    <Loader />
                ) : errorDetails ? (
                    <Message variant="danger">{errorDetails}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setName(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPrice(Number(e.target.value))
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setImage(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="image-file">Choose File</Form.Label>
                            <Form.Control
                                type="file"
                                id="image-file"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setBrand(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCountInStock(Number(e.target.value))
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCategory(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescription(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="d-grid">
                            <Button type="submit" className="btn btn-primary btn-lg my-3">
                                Update
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export { ProductEdit };
