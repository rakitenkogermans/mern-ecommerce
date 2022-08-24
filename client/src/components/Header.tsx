import { FC } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
    const location = useLocation();
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
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className="d-flex align-items-center gap-2"
                            >
                                <FaUserAlt size={20} />
                                Sign in
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export { Header };
