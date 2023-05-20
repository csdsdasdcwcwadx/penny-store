import React from "react";
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Order/store';
import { Provider } from 'react-redux';
import { Body, Header, Footer } from '@components/Order';
import './index.scss';

export function Order() {
    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
                <Body/>
            </div>
            <Footer/>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('order') as HTMLElement).render(
    <Provider store={store}>
        <Order/>
    </Provider>
);