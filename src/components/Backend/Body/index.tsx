import React, { memo, useEffect, useState } from "react";
import styles from './styles.module.scss';
import ProductSettings from "../ProductSettings";
import Data from "../Data";
import Shipping from "../Shipping";
import domain, { handlepath } from "@utils/domainByEnv";
import cN from 'classnames';
import axios from "axios";

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
    const [isadmin, setIsadmin] = useState(false);

    const handleCurrentData = (obj: E_currentType) => {
        setCurrent(obj);
        localStorage.setItem('currentData', obj);
    }

    useEffect (() => {
        const isLocal = window.location.href.includes('localhost');
        (async function() {
            try {
                const { data } = await axios.post(`${domain()}/member/isavailable`, {isLocal});
                if(!data.isadmin) {
                    // window.location.href = `${handlepath()}${data.url}`;
                }else {
                    setIsadmin(true);
                }
            }catch(e) {
                console.error(e);
            }
        })()
    },[])

    return (
        <div>
            {
                isadmin && <div className={styles.backend}>
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
            }
        </div>
    )
}

export default memo(Body);