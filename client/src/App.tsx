import {FC} from 'react';
import './assets/styles/main.css';
import {NAME} from './data/environment';

type AppProps = {};

const App: FC<AppProps> = () => {
    return <div>App, {NAME}</div>;
};

export {App};
