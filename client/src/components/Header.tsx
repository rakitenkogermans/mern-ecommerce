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
                            {Object.keys(userInfo).length !== 0 ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <Nav.Link as={Link} to="/profile" className="p-0">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </Nav.Link>
                                    <Nav.Link className="p-0">
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </Nav.Link>
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export { Header };
