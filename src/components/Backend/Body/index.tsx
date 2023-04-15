import React, { memo, useEffect, useState } from "react";
import styles from './styles.module.scss';
import ProductSettings from "../ProductSettings";

enum E_currentType {
    PRODUCT = 'PRODUCT',
}

function Body () {
    const [current, setCurrent] = useState<E_currentType>(E_currentType.PRODUCT);

    return (
        <div>
            <div className={styles.header}>
                <button>商品列表設定</button>
                <button>數據查看</button>
            </div>
            <ProductSettings/>
        </div>
    )
}

export default memo(Body);