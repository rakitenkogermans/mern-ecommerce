import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/bootstrap.min.css';
import './assets/styles/main.css';
import { SharedLayout } from './components/SharedLayout';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { Product } from './pages/Product';

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
                </Route>
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export { App };
