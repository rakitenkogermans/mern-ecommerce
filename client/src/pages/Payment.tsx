import { FC, FormEvent, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { FormContainer } from '../components/FormContainer';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';

type PaymentProps = {};

const Payment: FC<PaymentProps> = () => {
    const { shippingAddress } = useTypedSelector((state) => state.cart);
    const { savePaymentMethod } = useActions();
    const navigate = useNavigate();

    if (!shippingAddress?.address) {
        navigate('/payment');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };
    return (
        <FormContainer>
            <CheckoutSteps step1={true} step2={true} step3={true} step4={false} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/*<Form.Check*/}
                        {/*    type="radio"*/}
                        {/*    label="Stripe"*/}
                        {/*    id="Stripe"*/}
                        {/*    name="paymentMethod"*/}
                        {/*    value="Stripe"*/}
                        {/*    onChange={(e) => setPaymentMethod(e.target.value)}*/}
                        {/*></Form.Check>*/}
                    </Col>
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

export { Payment };
