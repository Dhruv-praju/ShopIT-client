import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <GoogleOAuthProvider
            clientId='342917729024-4ipj6q04gbjnpl6smlt617va02puoqad.apps.googleusercontent.com'
            >
                <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    </Provider>
);