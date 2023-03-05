import React from "react";
import styles from './styles.module.scss';
import cN from "classnames";

export default function Header() {
    return (
        <div className={styles.Header}>
            <div>
                <span>fb</span>
                <span>IG</span>
            </div>
            <div className={styles.logo}>
                PENNY_SHOP
            </div>
            <div>
                <span>seh</span>
                <span>會員登入</span>
                <span>sp</span>
            </div>
        </div>
    )
}