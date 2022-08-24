import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; ProShop</Col>
                </Row>
            </Container>
        </footer>
    );
};

export { Footer };
