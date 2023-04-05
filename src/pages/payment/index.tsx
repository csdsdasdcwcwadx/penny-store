import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Payment/store';
import { Provider } from 'react-redux';
import { Header, Body } from '@components/Payment';
import './index.scss';

export function Payment() {
    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
                <Body/>
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('payment') as HTMLElement).render(
    <Provider store={store}>
        <Payment/>
    </Provider>
);