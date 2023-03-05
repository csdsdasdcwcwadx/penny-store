import React, { memo } from "react";
import styles from './styles.module.scss';

function Footer () {
    return (
        <footer className={styles.Footer}>
            <div>
                <span>About Us</span>
                <span>About penny</span>
                <span>隱私權政策</span>
                <span>購物須知 | NOTICE</span>
                <span>匯款與填單 | TRANSFER</span>
            </div>
            <div>
                <span>聯絡資訊</span>
                <span>Contact Us</span>
                <span>nomomarket22@gmail.com</span>
                <span>Mon-Fri10:00-17:30(假日/例假日OFF)</span>
            </div>
        </footer>
    )
}

export default memo(Footer);