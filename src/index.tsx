import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {Provider} from 'react-redux';
import {HashRouter} from "react-router-dom";
import {store} from './app/store'


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<HashRouter>
	<Provider store={store}>
		<App />
	</Provider>
	</HashRouter>
	);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
