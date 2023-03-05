import React, { Fragment, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import BreadCrumb from '../Common/BreadCrumb';
import Item from '@components/Item';

interface I_image {
    name: string;
    src: string;
}

export default function Body() {
    const images = require.context('./imgs', false, /\.(png|jpe?g|svg)$/);

    const imageList = images.keys().map((imageName) => ({
        name: imageName.replace('./', ''),
        src: images(imageName),
    }));
    return (
        <div className={styles.Body}>
            <div className={styles.title}>熱騰騰現貨 | RESTOCK</div>
            <div className={styles.breadcrumb}>
                <BreadCrumb/>
            </div>
            <div className={styles.function}>
                <span>顯示第1至12項結果，共28項</span>
                <span>依最新項目排序</span>
            </div>
            <div className={styles.display}>
                {
                    imageList.map((img: I_image)=>{
                        return <Item key={img.name} img={img}/>
                    })
                }
            </div>
        </div>
    );
}
