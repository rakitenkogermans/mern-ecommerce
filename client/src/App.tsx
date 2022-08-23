import {FC} from 'react';
import {Container} from 'react-bootstrap';
import './assets/styles/bootstrap.min.css';
import './assets/styles/main.css';
import {Footer} from './components/Footer';
import {Header} from './components/Header';

type AppProps = {};

const App: FC<AppProps> = () => {
    return (
        <div>
            <Header />
            <main className="py-3">
                <Container>
                    <h1>hello world</h1>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export {App};
