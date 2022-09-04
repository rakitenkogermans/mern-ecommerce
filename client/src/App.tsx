import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
                </Route>
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export { App };
