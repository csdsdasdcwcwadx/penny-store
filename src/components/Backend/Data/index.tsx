import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles.module.scss';
import { RootState } from '@Redux/Backend/store';
import { call_getalldata } from "@Redux/Backend/actions";
import BarChart from "./BarChart";

function Data () {
    const dispatch = useDispatch();
    const { productdata } = useSelector((store: RootState)=>store);

    useEffect(() => {
        dispatch(call_getalldata({}));
    },[dispatch])

    console.log(productdata)

    return (
        <div>
            <BarChart/>
        </div>
    )
}

export default memo(Data);