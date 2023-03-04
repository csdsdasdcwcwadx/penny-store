import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from '@Redux/busSeatReservation/store';
import { RootState } from '@Redux/busSeatReservation/store';
import styles from './styles.module.scss';
import { Body } from '@components/BusSeatReservationPage';

function BusSeatReservation() {

    const Car = useSelector((store: RootState) => store.carData);

    console.log("@@@", Car)

    return (
        <div className={styles.color}>
            123456789
            <Body/>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BusSeatReservation />
        </Provider>
    </React.StrictMode>,
);
