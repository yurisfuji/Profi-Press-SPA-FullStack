import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment/AdapterMoment.js';
import { ruRU } from '@mui/x-date-pickers/locales/ruRU.js'

import store from './redux/store.js'

import App from './App.js';
import onPageScroll from './js/scrollUp.js'

// add listener to scroll page with changing dashOffset
window.addEventListener('scroll', onPageScroll)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
                <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <App />
                </LocalizationProvider>
        </Provider>
    </BrowserRouter>
);

