import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FormContainer } from '../components/FormContainer';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useActions();
    const { userInfo, isLoading, error } = useTypedSelector((state) => state.user);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '';

    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {isLoading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Addres</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="d-grid">
                    <Button type="submit" className="btn btn-primary btn-lg my-3">
                        Sign In
                    </Button>
                </Form.Group>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export { Login };
