import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Personal/store';
import { Provider } from 'react-redux';
import { Header, Body, Footer } from '@components/Personal';
import './index.scss';

export function Personal() {
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

ReactDOM.createRoot(document.getElementById('personal') as HTMLElement).render(
    <Provider store={store}>
        <Personal/>
    </Provider>
);