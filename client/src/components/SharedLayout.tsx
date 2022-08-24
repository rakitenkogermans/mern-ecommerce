import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

type SharedLayoutProps = {};

const SharedLayout: FC<SharedLayoutProps> = () => {
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
