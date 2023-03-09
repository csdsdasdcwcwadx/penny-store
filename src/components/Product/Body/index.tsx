import React, { memo, useEffect, useState } from "react";
import BreadCrumb from "@components/Common/BreadCrumb";
import styles from './styles.module.scss';
import img from '@components/imgs/DIOR皮帶.jpg';
import cN from 'classnames';
import Select, { SelectInstance } from 'react-select'

function Body() {

    const sizeOptions = [
        {label: '請選擇', value: '', isDisabled: true},
        {label: 'S號', value: 'S'},
        {label: 'M號', value: 'M'},
        {label: 'L號', value: 'L'},
    ]

    const buyOptions = [
        {label: '請選擇', value: '', isDisabled: true},
        {label: '現貨', value: 'current'},
        {label: '預購', value: 'preorder'},
    ]

    const [counter, setCounter] = useState<number>(1);
    const [selectSize, setSelectSize] = useState('');
    const [selectBuy, setSelectBuy] = useState('');

    return (
        <div className={styles.Body}>
            <div className={styles.breadcrumb}>
                <BreadCrumb/>
            </div>
            <div className={styles.productarea}>
                <div className={styles.imgframe}>
                    <img src={img}/>
                </div>
                <div className={styles.description}>
                    <span className={styles.productname}>貝殼光澤！透膚澎澎袖襯衫</span>
                    <span className={styles.productprice}>NT$269 – NT$380</span>
                    <div className={cN(styles.selection, styles.productsize)}>
                        <span className={styles.info}>尺寸</span>
                        <div className={styles.select}>
                            <Select 
                                options={sizeOptions} 
                                onChange={e=>setSelectSize(e?.value || '')} 
                                placeholder='請選擇' 
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div className={cN(styles.selection, styles.productbuy)}>
                    <span className={styles.info}>現貨/預購</span>
                        <div className={styles.select}>
                            <Select 
                                options={buyOptions} 
                                onChange={e=>setSelectBuy(e?.value || '')} 
                                placeholder='請選擇' 
                                isSearchable={false}
                            />
                        </div>
                    </div>
                    <div className={styles.productothers}> 
                        <div className={styles.productsums}>
                            <span className={styles.minus} onClick={()=>setCounter(pre=>{
                                if(pre>1)return pre-1;
                                return pre;
                            })}> </span>
                            <span className={styles.counter}>{counter}</span>
                            <span className={styles.add} onClick={()=>setCounter(pre=>pre+1)}> </span>
                        </div>
                        <button>加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Body);