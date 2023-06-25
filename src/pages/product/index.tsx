import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Product/store';
import { Provider } from 'react-redux';
import { Header, Footer, Body, SideBar } from '@components/Product';
import './index.scss';

export function Product() {
    const [trigger, setTrigger] = useState(false);
    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
                <Body setTrigger={setTrigger}/>
            </div>
            <SideBar trigger={trigger}/>
            <Footer/>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('product') as HTMLElement).render(
    <Provider store={store}>
        <Product/>
    </Provider>
);