import React, { useEffect } from 'react';
import './index.scss';
import { Header, Body, Footer, SideBar } from '@components/App/index';

function App() {
    
    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
                <Body/>
            </div>
            <SideBar/>
            <Footer/>
        </div>
    );
}

export default App;
