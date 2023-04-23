import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Backend/store';
import { Provider } from 'react-redux';
import { Body } from '@components/Backend';
import './index.scss';

function Backend() {
    
    return (
        <div className='pages'>
            <div className='topper'>
                <Body/>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('backend') as HTMLElement).render(
    <Provider store={store}>
        <Backend/>
    </Provider>
);