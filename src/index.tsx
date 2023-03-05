import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { store } from '@Redux/App/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <App/> */}
            <a href="/Product.html">產品頁</a>
        </Provider>
    </React.StrictMode>
);
