import { FC, FormEvent, useState } from 'react';
import { FormContainer } from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps } from '../components/CheckoutSteps';

type ShippingProps = {};

const Shipping: FC<ShippingProps> = () => {
    const { shippingAddres } = useTypedSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingAddres?.address || '');
    const [city, setCity] = useState(shippingAddres?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddres?.postalCode || '');
    const [country, setCountry] = useState(shippingAddres?.country || '');
    const { saveShippingAddress } = useActions();
    const navigate = useNavigate();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country });
        navigate('/payment');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1={true} step2={true} step3={false} step4={false} />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary" className="btn btn-primary btn-lg my-3">
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};

export { Shipping };
