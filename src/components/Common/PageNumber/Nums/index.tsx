import React, { memo } from "react";
import styles from './styles.module.scss';
import cN from 'classnames';

interface I_props {
    num: number;
    maxpage: number;
    click: Function;
    serial?: number;
}

function Nums ({num, click, maxpage, serial}: I_props) {

    return (
        <span onClick={()=>click(num)} className={cN({[styles.isDisabled]: num <= 0 || num>maxpage}, {[styles.isChoosed]: serial && serial === num})}>
            {num}
        </span>
    )
}

export default memo(Nums);