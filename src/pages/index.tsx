import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@Redux/busSeatReservation/store';
import './index.scss';
import { Header, Body, Navigator, Footer } from '@components/index';

function BusSeatReservation() {

    // const Car = useSelector((store: RootState) => store.carData);

    // console.log("@@@", Car)

    return (
        <div className='pages'>
            <div className='topper'>
                <Header/>
                <Navigator/>
                <Body/>
            </div>
            <Footer/>
        </div>
    );
}

export default BusSeatReservation;
