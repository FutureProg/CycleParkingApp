import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import reducers from './store';

import * as serviceWorker from './serviceWorker';
import NetworkManager from './util/NetworkManager';

const windowIfDefined = typeof window === 'undefined' ? null : window;
const composeEnhancers = process.env.NODE_ENV !== 'production' ? windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

// Init the network manager
new NetworkManager().setDispatch(store.dispatch);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
