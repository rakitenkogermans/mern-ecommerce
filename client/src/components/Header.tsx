import {FC} from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {FaShoppingCart, FaUserAlt} from 'react-icons/fa';

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="gap-4 ms-auto">
                            <Nav.Link href="/cart" className="d-flex align-items-center gap-2">
                                <FaShoppingCart size={20} />
                                Cart
                            </Nav.Link>
                            <Nav.Link href="/login" className="d-flex align-items-center gap-2">
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

export {Header};
