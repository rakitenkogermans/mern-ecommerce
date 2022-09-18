import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { FormContainer } from '../components/FormContainer';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Form, Button } from 'react-bootstrap';
import { useActions } from '../hooks/useActions';

type UserEditProps = {};

const UserEdit: FC<UserEditProps> = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { getUserById, userDetailsReset } = useActions();
    const { userInfo } = useTypedSelector((state) => state.user);
    const {
        user,
        isLoading: isLoadingDetails,
        error: errorDetails,
    } = useTypedSelector((state) => state.userDetails);
    const navigate = useNavigate();

    useEffect(() => {
        if (!(userInfo && userInfo.isAdmin)) {
            navigate('/login');
            return;
        }
        if (!user) {
            getUserById(id || '');
            return;
        }
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
        return () => {
            userDetailsReset();
        };
    }, [userInfo, navigate, user]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/userlist">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {/*{loadingUpdate && <Loader />}*/}
                {/*{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}*/}
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

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isadmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setIsAdmin(e.target.checked)
                                }
                            ></Form.Check>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export { UserEdit };
