import { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './assets/styles/bootstrap.min.css';
import './assets/styles/main.css';
import { SharedLayout } from './components/SharedLayout';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Shipping } from './pages/Shipping';
import { Payment } from './pages/Payment';
import { PlaceOrder } from './pages/PlaceOrder';
import { Order } from './pages/Order';
import { UserList } from './pages/UserList';
import { UserEdit } from './pages/UserEdit';
import { ProductList } from './pages/ProductList';

type AppProps = {};

const App: FC<AppProps> = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:id" element={<Product />} />
                    <Route path="cart/:id" element={<Cart />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="shipping" element={<Shipping />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="placeorder" element={<PlaceOrder />} />
                    <Route path="order/:id" element={<Order />} />
                    <Route path="admin">
                        <Route index element={<Navigate to="userlist" />} />
                        <Route path="userlist" element={<UserList />} />
                        <Route path="productlist" element={<ProductList />} />
                        <Route path="user/:id/edit" element={<UserEdit />} />
                        <Route path="*" element={<Navigate to="userlist" />} />
                    </Route>
                </Route>
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export { App };
