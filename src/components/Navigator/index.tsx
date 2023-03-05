import React from "react";
import styles from './styles.module.scss';

export default function Navigator() {
    return (
        <div className={styles.Navigator}>
            <li>Home</li>
            <li>全部商品 | SHOP ALL</li>
            <li>優惠專區 | SALE</li>
            <li>熱騰騰現貨 | RESTOCK</li>
            <li>穿搭筆記本 | WEAR</li>
            <li>更多</li>
        </div>
    )
}