import React, { memo } from "react";
import cN from 'classnames';
import styles from './styles.module.scss';

interface I_props {
    num: number;
    maxpage: number;
    click: Function;
    serial?: number;
}

function PageNumber ({num, click, maxpage, serial}: I_props) {

    const handleClick = () => {
        click(num);
    }

    return (
        <span onClick={handleClick} className={cN({[styles.isDisabled]: num <= 0 || num>maxpage}, {[styles.isChoosed]: serial && serial === num})}>
            {num}
        </span>
    )
}

export default memo(PageNumber);