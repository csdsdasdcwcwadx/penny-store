import React, { memo } from "react";
import styles from './styles.module.scss';

function BreadCrumb() {
    return (
        <div className={styles.BreadCrumb}>
            <span>首頁</span> {">"} 
            <span> SHOP ALL</span> {">"} 
            <span> 熱騰騰現貨｜RESTOCK</span>
        </div>
    )
}

export default memo(BreadCrumb);