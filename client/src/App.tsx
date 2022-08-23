import {FC} from 'react';
import {Container} from 'react-bootstrap';
import './assets/styles/bootstrap.min.css';
import './assets/styles/main.css';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import { HomeScreen } from './pages/HomeScreen';

type AppProps = {};

const App: FC<AppProps> = () => {
    return (
        <div>
            <Header />
            <main className="py-3">
                <Container>
                    <HomeScreen/>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export {App};
