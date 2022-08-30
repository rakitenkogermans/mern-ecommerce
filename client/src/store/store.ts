import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';

const middleware = [thunk];

const store: Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export { store };
