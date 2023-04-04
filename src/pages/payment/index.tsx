import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Product/store';
import { Provider } from 'react-redux';
import { Header, Footer, Body } from '@components/Product';
import './index.scss';

export function Product() {
    return (
        <div className='pages'>
            <div className='topper'>
                付款頁
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('payment') as HTMLElement).render(
    <Provider store={store}>
        <Product/>
    </Provider>
);