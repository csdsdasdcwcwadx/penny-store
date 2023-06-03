import React, { memo } from "react";
import { useSelector } from "react-redux";
import styles from './styles.module.scss';
import { RootState } from '@Redux/Backend/store';

function BarChart() {
    const { productdata } = useSelector((store: RootState)=>store);

    return (
        <div>
            bar
        </div>
    )
}

export default memo(BarChart);