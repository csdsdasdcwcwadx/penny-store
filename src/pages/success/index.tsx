import React from "react";
import ReactDOM from 'react-dom/client';
import { store } from '@Redux/Product/store';
import { Provider } from 'react-redux';

export function Success() {
    return (
        <div>
            success
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('paymentsuccess') as HTMLElement).render(
    <Provider store={store}>
        <Success/>
    </Provider>
);