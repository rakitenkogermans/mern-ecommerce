import { FC } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
    const location = useLocation();
    const { logout } = useActions();
    const { userInfo } = useTypedSelector((state) => state.user);
    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <NavLink to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="gap-4 ms-auto" activeKey={location.pathname}>
                            <Nav.Link
                                as={Link}
                                to="/cart"
                                className="d-flex align-items-center gap-2"
                            >
                                <FaShoppingCart size={20} />
                                Cart
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <Nav>
                                        <NavDropdown.Item as={Link} to="/profile">
                                            Profile
                                        </NavDropdown.Item>
                                    </Nav>

                                    <Nav className="p-0">
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </Nav>
                                </NavDropdown>
                            ) : (
                                <Nav.Link
                                    as={Link}
                                    to="/login"
                                    className="d-flex align-items-center gap-2"
                                >
                                    <FaUserAlt size={20} />
                                    Sign in
                                </Nav.Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="admin">
                                    <Nav>
                                        <NavDropdown.Item as={Link} to="/admin/userlist">
                                            Users
                                        </NavDropdown.Item>
                                    </Nav>
                                    <Nav>
                                        <NavDropdown.Item as={Link} to="/admin/productlist">
                                            Products
                                        </NavDropdown.Item>
                                    </Nav>

                                    <Nav>
                                        <NavDropdown.Item as={Link} to="/admin/orderlist">
                                            Orders
                                        </NavDropdown.Item>
                                    </Nav>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export { Header };
