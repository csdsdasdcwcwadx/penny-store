import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/busSeatReservation';
import { store } from '@Redux/busSeatReservation/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
