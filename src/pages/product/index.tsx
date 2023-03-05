import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Product/store';
import { Provider } from 'react-redux';

export function Product() {
    return (
        <div>
            Product
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Product/>
        </Provider>
    </React.StrictMode>
);