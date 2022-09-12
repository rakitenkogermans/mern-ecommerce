import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

type SharedLayoutProps = {};

const SharedLayout: FC<SharedLayoutProps> = () => {
    const { userInfo } = useTypedSelector((state) => state.user);
    const { getUserProfile } = useActions();
    useEffect(() => {
        if (userInfo) {
            getUserProfile();
        }
    }, []);
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    );
};

export { SharedLayout };
