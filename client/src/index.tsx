import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PAYPAL_CLIENT_ID } from './data/environment';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const container = document.getElementById('root') as HTMLElement;

// create a root
const root = createRoot(container);

//render app to root
root.render(
    <PayPalScriptProvider deferLoading={true} options={{ 'client-id': PAYPAL_CLIENT_ID }}>
        <Provider store={store}>
            <App />
        </Provider>
    </PayPalScriptProvider>
);
