import React, { memo } from "react";
import cN from 'classnames';
import styles from './styles.module.scss';
import Nums from "./Nums";

interface I_props {
    maxpage: number;
    serial: number;
    setSerial: Function;
}

function PageNumber ({setSerial, maxpage, serial}: I_props) {

    return (
        <div className={styles.pagenumber}>
            <Nums num={serial-1} click={setSerial} maxpage={maxpage} serial={serial}/>
            <Nums num={serial} click={setSerial} maxpage={maxpage} serial={serial}/>
            <Nums num={serial+1} click={setSerial} maxpage={maxpage} serial={serial}/>
            <div>......</div>
            <Nums num={maxpage} click={setSerial} maxpage={maxpage}/>
        </div>
    )
}

export default memo(PageNumber);