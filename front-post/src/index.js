import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'primereact/core/core.min.js';
import 'primereact/toast/toast.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

import store from './redux/store'
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.render(
    <Provider store={store}>

            <App />

    </Provider>

    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
