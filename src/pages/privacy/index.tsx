import React from 'react';
import ReactDOM from 'react-dom/client';
import { Body, Header, Footer } from '@components/Privacy';
import { store } from '@Redux/Privacy/store';
import { Provider } from 'react-redux';
import './index.scss';

function Privacy() {
    
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

ReactDOM.createRoot(document.getElementById('privacy') as HTMLElement).render(
    <Provider store={store}>
        <Privacy/>
    </Provider>
);