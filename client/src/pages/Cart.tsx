import { FC, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

type CartProps = {};

const Cart: FC<CartProps> = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const qty = Number(searchParams.get('qty')) || 1;
    const { addToCart } = useActions();
    const { cartItems } = useTypedSelector((state) => state.cart);
    console.log(cartItems);
    useEffect(() => {
        if (id) {
            addToCart(id, qty);
        }
    }, [id, qty]);

    return <div>Cart</div>;
};

export { Cart };
