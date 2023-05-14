import React from "react";
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Product/store';
import { Provider } from 'react-redux';
import { Body } from '@components/Order';

export function Order() {
    return (
        <div>
            <Body/>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('order') as HTMLElement).render(
    <Provider store={store}>
        <Order/>
    </Provider>
);