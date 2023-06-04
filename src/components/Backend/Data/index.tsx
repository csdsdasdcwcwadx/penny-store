import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './styles.module.scss';
import { RootState } from '@Redux/Backend/store';
import { call_getalldata } from "@Redux/Backend/actions";
import BarDataChart from "./BarDataChart";
import CircleDataChart from "./CircleDataChart";
// import LineDataChart from "./LineDataChart";
import { getRandomColor } from "@utils/commonfunction";

enum showType {
    Bars = '長條圖',
    // Line = '折線圖',
    Circle = '圓餅圖',
}

function Data () {
    const dispatch = useDispatch();
    const { productdata } = useSelector((store: RootState)=>store);
    const [type, setType] = useState<showType>(showType.Bars)

    useEffect(() => {
        dispatch(call_getalldata({}));
    },[dispatch])

    const infoData = useMemo(() => {
        const arr = productdata?.productdatainfo.map((obj) => {
            return {name: `${obj.p_name}`, ['產品點擊次數']: obj.clickSum};
        }) || [];
        return {
            info: arr,
            title: [
                {color: getRandomColor(), dentify: '產品點擊次數'},
            ]
        }
    },[productdata])

    const infoallData = useMemo(() => {
        const arr = productdata?.productdatainfoall.map((obj) => {
            return {name: `${obj.p_name}(${obj.p_size})(${obj.p_color})`, ['產品加入購物車次數']: obj.adding, ['產品購買次數']: obj.buys};
        }) || [];

        return {
            info: arr,
            title: [
                {color: getRandomColor(), dentify: '產品加入購物車次數'},
                {color: getRandomColor(), dentify: '產品購買次數'},
            ]
        }
    },[productdata])

    return (
        <div className={styles.Data}>
            <div className={styles.buttonGroup}>
                {
                    Object.keys(showType).map((key, ind) => {
                        return <button key={ind} onClick={()=>setType(showType[key as keyof typeof showType])}>{showType[key as keyof typeof showType]}</button>
                    })
                }
            </div>
            <div>
                {
                    type === showType.Bars ?
                    <div>
                        <BarDataChart info={infoData.info} title={infoData.title}/>
                        <BarDataChart info={infoallData.info} title={infoallData.title}/>
                    </div> : type === showType.Circle ?
                    <CircleDataChart/> : ''
                }
            </div>
        </div>
    )
}

export default memo(Data);