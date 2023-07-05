import React from 'react';
import ReactDOM from 'react-dom/client';
import { Body, Header, Footer } from '@components/Note';
import { store } from '@Redux/Note/store';
import { Provider } from 'react-redux';
import './index.scss';

function Note() {
    
    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
                <Body/>
            </div>
            <Footer/>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('note') as HTMLElement).render(
    <Provider store={store}>
        <Note/>
    </Provider>
);