import React, { memo, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from './styles.module.scss'

interface I_props {
    info: Array<any>;
    title: Array<{
        color: string;
        dentify: string;
    }>
}

function BarDataChart({info, title}: I_props) {

    const infoallWidth = useMemo(() => {
        return info.length * 200;
    },[info])

    return (
        <section className={styles.Bar}>
            <BarChart width={infoallWidth} height={500} data={info} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    title.map((obj, ind) => {
                        return <Bar key={ind} dataKey={obj.dentify} fill={obj.color} />
                    })
                }
            </BarChart>
        </section>
    )
}

export default memo(BarDataChart);