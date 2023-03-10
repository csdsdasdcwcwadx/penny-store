import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { store } from '@Redux/App/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('menu') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
