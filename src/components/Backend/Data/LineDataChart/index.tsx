import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from './styles.module.scss';
import { RootState } from '@Redux/Backend/store';
import { getRandomColor } from "@utils/commonfunction";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineDataChart() {
    const { productdata } = useSelector((store: RootState)=>store);

    const data1 = useMemo(() => {
        return productdata?.productdatainfo.map((obj) => {
            return {
                name: obj.p_name,
                color: getRandomColor(),
                uv: 3000,
                pv: 1398,
                amt: obj.clickSum,
            }
        })
    },[productdata])

    return (
        <div>
            <section className={styles.Line}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data1}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
            </section>
        </div>
    )
}

export default memo(LineDataChart);