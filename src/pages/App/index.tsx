import React, { useEffect } from 'react';
import './index.scss';
import { Header, Body, Footer } from '@components/App/index';

function App() {
    
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

export default App;
