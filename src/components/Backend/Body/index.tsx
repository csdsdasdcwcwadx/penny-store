import React, { memo, useEffect, useState } from "react";
import styles from './styles.module.scss';
import ProductSettings from "../ProductSettings";
import Data from "../Data";
import Shipping from "../Shipping";
import { handlepath } from "@utils/domainByEnv";
import cN from 'classnames';

const handleCurrentType = (name: E_currentType) => {
    switch(name){
        case E_currentType.ANDATA:
            return '查看數據';
        case E_currentType.PRODUCT:
            return '商品列表設定';
        case E_currentType.SHIPPING:
            return '出貨訂單';
    }
}

enum E_currentType {
    PRODUCT = 'PRODUCT',
    ANDATA = 'ANDATA',
    SHIPPING = 'SHIPPING',
}

const currentData = localStorage.getItem('currentData');

function Body () {
    const [current, setCurrent] = useState<E_currentType>(currentData as E_currentType || E_currentType.PRODUCT);

    const handleCurrentData = (obj: E_currentType) => {
        setCurrent(obj);
        localStorage.setItem('currentData', obj);
    }

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
        <div className={styles.backend}>
            <div className={styles.header}>
                {
                    Object.keys(E_currentType).map((obj, ind) => {
                        return (
                            <button className={cN({[styles.active]: obj === current})} key={ind} onClick={()=>handleCurrentData(obj as E_currentType)}>{handleCurrentType(obj as E_currentType)}</button>
                        )
                    })
                }
            </div>
            <div className={styles.backendbody}>
                {
                    current === E_currentType.PRODUCT ? <ProductSettings/>:
                    current === E_currentType.ANDATA ? <Data/>:
                    <Shipping/>
                }
            </div>
        </div>
    )
}

export default memo(Body);