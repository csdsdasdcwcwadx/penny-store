import React, { memo, useEffect, useState } from "react";
import styles from './styles.module.scss';
import ProductSettings from "../ProductSettings";
import Data from "../Data";
import { handlepath } from "@utils/domainByEnv";

enum E_currentType {
    PRODUCT = 'PRODUCT',
    ANDATA = 'ANDATA',
}

function Body () {
    const [current, setCurrent] = useState<E_currentType>(E_currentType.PRODUCT);

    useEffect (() => {
        const member = JSON.parse(localStorage.getItem('memberinfo')!);
        const google = JSON.parse(localStorage.getItem('credentials')!);

        if(!member && !google) {
            alert('請先登入會員');
            window.location.href = `${handlepath()}`;

        }
        if(member && member.memberinfo[0].isAdmin !== 1) {
            alert('不符合會員資格');
            window.location.href = `${handlepath()}`;
        }
    },[])

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