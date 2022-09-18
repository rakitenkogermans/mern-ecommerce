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
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { getUserById, userDetailsReset, updateUserDetails, updateUserDetailsReset } =
        useActions();
    const { userInfo } = useTypedSelector((state) => state.user);
    const {
        success: succesUpdate,
        isLoading: isLoadingUpdate,
        error: errorUpdate,
    } = useTypedSelector((state) => state.userDetailsUpdate);
    const {
        user,
        isLoading: isLoadingDetails,
        error: errorDetails,
    } = useTypedSelector((state) => state.userDetails);

    useEffect(() => {
        if (!(userInfo && userInfo.isAdmin)) {
            navigate('/login');
            return;
        }
        if (succesUpdate) {
            navigate('/admin/userlist');
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
            updateUserDetailsReset();
            userDetailsReset();
        };
    }, [userInfo, navigate, user, succesUpdate]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user) {
            const userUpdate = { ...user, name, email, isAdmin };
            updateUserDetails(userUpdate);
        }
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/userlist">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
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

export { UserEdit };
