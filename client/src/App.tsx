import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './assets/styles/bootstrap.min.css';
import './assets/styles/main.css';
import { SharedLayout } from './components/SharedLayout';

const Cart = lazy(() => import('./pages/Cart').then((module) => ({ default: module.Cart })));
const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Product = lazy(() =>
    import('./pages/Product').then((module) => ({ default: module.Product }))
);
const Login = lazy(() => import('./pages/Login').then((module) => ({ default: module.Login })));
const Register = lazy(() =>
    import('./pages/Register').then((module) => ({ default: module.Register }))
);
const Profile = lazy(() =>
    import('./pages/Profile').then((module) => ({ default: module.Profile }))
);
const Shipping = lazy(() =>
    import('./pages/Shipping').then((module) => ({ default: module.Shipping }))
);
const Payment = lazy(() =>
    import('./pages/Payment').then((module) => ({ default: module.Payment }))
);
const PlaceOrder = lazy(() =>
    import('./pages/PlaceOrder').then((module) => ({ default: module.PlaceOrder }))
);
const Order = lazy(() => import('./pages/Order').then((module) => ({ default: module.Order })));
const UserList = lazy(() =>
    import('./pages/UserList').then((module) => ({ default: module.UserList }))
);
const UserEdit = lazy(() =>
    import('./pages/UserEdit').then((module) => ({ default: module.UserEdit }))
);
const ProductList = lazy(() =>
    import('./pages/ProductList').then((module) => ({ default: module.ProductList }))
);
const NotFound = lazy(() =>
    import('./pages/NotFound').then((module) => ({ default: module.NotFound }))
);
const ProductEdit = lazy(() =>
    import('./pages/ProductEdit').then((module) => ({ default: module.ProductEdit }))
);
const OrderList = lazy(() =>
    import('./pages/OrderList').then((module) => ({ default: module.OrderList }))
);

type AppProps = {};

const App: FC<AppProps> = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<SharedLayout />}>
                        <Route index element={<Home />} />
                        <Route path="search/:keyword" element={<Home />} />
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
                            <Route path="orderlist" element={<OrderList />} />
                            <Route path="user/:id/edit" element={<UserEdit />} />
                            <Route path="product/:id/edit" element={<ProductEdit />} />
                            <Route path="*" element={<Navigate to="userlist" />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export { App };
