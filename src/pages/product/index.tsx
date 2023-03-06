import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Product/store';
import { Provider } from 'react-redux';
import { Header, Footer } from '@components/Product';
import './index.scss';

export function Product() {
    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
            </div>
            <Footer/>
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