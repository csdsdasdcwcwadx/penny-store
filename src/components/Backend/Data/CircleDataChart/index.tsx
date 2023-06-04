import React, { memo, useMemo } from "react";
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
import { useSelector } from "react-redux";
import styles from './styles.module.scss';
import { RootState } from '@Redux/Backend/store';
import { getRandomColor } from "@utils/commonfunction";

function CircleDataChart () {
    const { productdata } = useSelector((store: RootState)=>store);

    const data1 = useMemo(() => {
        return productdata?.productdatainfo.map((obj) => {
            return {name: obj.p_name, ['產品點擊次數']: obj.clickSum, color: getRandomColor()};
        }) || [];
    },[productdata])

    const data2 = useMemo(() => {
        return productdata?.productdatainfoall.map((obj) => {
            return {name: `${obj.p_name}(${obj.p_size})(${obj.p_color})`, ['產品加入購物車次數']: obj.adding, color: getRandomColor()};
        }) || [];
    },[productdata])

    const data3 = useMemo(() => {
        return productdata?.productdatainfoall.map((obj) => {
            return {name: `${obj.p_name}(${obj.p_size})(${obj.p_color})`, ['產品購買次數']: obj.buys, color: getRandomColor()};
        }) || [];
    },[productdata])

    return (
        <div>
            <section className={styles.Pie}>
                <label>產品點擊次數</label>
                <PieChart width={400} height={400}>
                    <Pie data={data1} dataKey="產品點擊次數" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label activeIndex={5}>
                        {
                            data1.map((obj, ind) => {
                                return <Cell key={ind} fill={obj.color}/>
                            })
                        }
                    </Pie>
                    <Legend verticalAlign="middle" align="right" layout="vertical" />
                    <Tooltip/>
                </PieChart>
            </section>
            <section className={styles.Pie}>
                <label>產品加入購物車次數</label>
                <PieChart width={600} height={400}>
                    <Pie data={data2} dataKey="產品加入購物車次數" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                        {
                            data2.map((obj, ind) => {
                                return <Cell key={ind} fill={obj.color}/>
                            })
                        }
                    </Pie>
                    <Legend verticalAlign="middle" align="right" layout="vertical" />
                    <Tooltip/>
                </PieChart>
            </section>
            <section className={styles.Pie}>
                <label>產品購買次數</label>
                <PieChart width={600} height={400}>
                    <Pie data={data3} dataKey="產品購買次數" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                        {
                            data3.map((obj, ind) => {
                                return <Cell key={ind} fill={obj.color}/>
                            })
                        }
                    </Pie>
                    <Legend verticalAlign="middle" align="right" layout="vertical" />
                    <Tooltip/>
                </PieChart>
            </section>
        </div>
    )
}

export default memo(CircleDataChart);