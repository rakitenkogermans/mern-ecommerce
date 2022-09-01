import { FC, ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type FormContainerProps = { children: ReactNode };

const FormContainer: FC<FormContainerProps> = ({ children }) => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>{' '}
        </Container>
    );
};

export { FormContainer };
