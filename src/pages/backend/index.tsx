import React from 'react';
import ReactDOM from 'react-dom/client';
// import { store } from '@Redux/Product/store';
import { Provider } from 'react-redux';
import './index.scss';

function Backend() {
    
    return (
        <div className='pages'>
            <div className='topper'>
                backend
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('backend') as HTMLElement).render(
    <Backend/>
);