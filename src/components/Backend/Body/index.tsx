import React, { memo, useEffect, useState } from "react";
import styles from './styles.module.scss';
import ProductSettings from "../ProductSettings";
import Data from "../Data";

enum E_currentType {
    PRODUCT = 'PRODUCT',
    ANDATA = 'ANDATA',
}

function Body () {
    const [current, setCurrent] = useState<E_currentType>(E_currentType.PRODUCT);

    return (
        <div>
            <div className={styles.header}>
                <button onClick={()=>setCurrent(E_currentType.PRODUCT)}>商品列表設定</button>
                <button onClick={()=>setCurrent(E_currentType.ANDATA)}>數據查看</button>
            </div>
            {
                current === E_currentType.PRODUCT ? <ProductSettings/>:<Data/>
            }
        </div>
    )
}

export default memo(Body);