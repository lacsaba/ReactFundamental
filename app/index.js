import React from 'react';
import { render } from 'react-dom';
import configureStore from './reduxComponents/store/configureStore';
import { Provider } from 'react-redux';
import App from './views/App.jsx';
import 'css/main.css';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app'));
