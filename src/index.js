import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import {CookiesProvider} from 'react-cookie'
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
  } from '@mui/material/styles';
  
import { GoogleOAuthProvider } from '@react-oauth/google';
  
import App from './App'
  
let theme = createTheme();
theme = responsiveFontSizes(theme);

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <GoogleOAuthProvider
            clientId='342917729024-4ipj6q04gbjnpl6smlt617va02puoqad.apps.googleusercontent.com'
            >
                <CookiesProvider>
                    <ThemeProvider theme={theme}>
                    <App />
                    </ThemeProvider>
                </CookiesProvider>
            </GoogleOAuthProvider>

        </BrowserRouter>
    </Provider>
);