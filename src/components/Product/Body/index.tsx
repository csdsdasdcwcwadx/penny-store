import React, { memo } from "react";
import BreadCrumb from "@components/Common/BreadCrumb";
import styles from './styles.module.scss';
import img from '@components/imgs/DIOR皮帶.jpg';
import cN from 'classnames';

function Body() {
    return (
        <div className={styles.Body}>
            <BreadCrumb/>
            <div className={styles.productarea}>
                <img src={img}/>
                <div className={styles.description}>
                    <span className={styles.productname}>貝殼光澤！透膚澎澎袖襯衫</span>
                    <span className={styles.productprice}>NT$269 – NT$380</span>
                    <div className={cN(styles.selection, styles.productsize)}>
                        <span className={styles.info}>尺寸</span>
                        <div className={styles.select}>
                            <select>
                                <option value="none">請選取一個選項</option>
                                <option value="S">S號</option>
                                <option value="M">M號</option>
                                <option value="L">L號</option>
                            </select>
                        </div>
                    </div>
                    <div className={cN(styles.selection, styles.productbuy)}>
                    <span className={styles.info}>現貨/預購</span>
                        <div className={styles.select}>
                            <select>
                                <option value="none">請選取一個選項</option>
                                <option value="current">現貨</option>
                                <option value="preorder">預購</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Body);