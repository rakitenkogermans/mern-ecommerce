import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { UserType } from '../@types/user';

type ProfileProps = {};

const Profile: FC<ProfileProps> = () => {
    const { userInfo, isLoading, error, success } = useTypedSelector((state) => state.user);
    const [name, setName] = useState(userInfo?.name || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const { updateUserProfile } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate, userInfo]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords don't match!");
            return;
        }
        setMessage(null);
        if (userInfo) {
            const user: UserType & { password?: string } = { ...userInfo, name, email };
            if (password.trim().length > 8 && confirmPassword.trim().length > 8) {
                user.password = password;
            }
            updateUserProfile(user);
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Profile Updated</Message>}
                {isLoading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Addres</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className="d-grid">
                        <Button type="submit" className="btn btn-primary btn-lg my-3">
                            Update
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};

export { Profile };
