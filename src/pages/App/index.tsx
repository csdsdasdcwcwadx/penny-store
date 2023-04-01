import React from 'react';
import './index.scss';
import { Header, Body, Footer, SideBar } from '@components/App/index';

function App() {
    
    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
                <Body/>
            </div>
            <Footer/>
            <SideBar/>
        </div>
    );
}

export default App;
