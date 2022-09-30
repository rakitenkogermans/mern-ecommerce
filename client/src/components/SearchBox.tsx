import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

type SearchBoxProps = {};

const SearchBox: FC<SearchBoxProps> = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} className="ms-5">
            <Row>
                <Col md={8}>
                    <Form.Control
                        type="text"
                        name="q"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                        placeholder="Search Products..."
                        className="ms-sm-2 me-sm-5"
                    ></Form.Control>
                </Col>
                <Col md={4}>
                    <Button type="submit" variant="outline-success" className="p-2 w-100">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export { SearchBox };
