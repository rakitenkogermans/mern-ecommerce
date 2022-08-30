import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const container = document.getElementById('root') as HTMLElement;

// create a root
const root = createRoot(container);

//render app to root
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
