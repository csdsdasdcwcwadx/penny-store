import React from 'react';
import { useSelector } from 'react-redux';
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

export default BusSeatReservation;
