import React, { memo } from "react";
import styles from './styles.module.scss';
import { handlepath } from "@utils/domainByEnv";

function Footer () {
    const isLocal = window.location.href.includes('localhost');

    return (
        <footer className={styles.Footer}>
            <div>
                <a>About Us</a>
                <a>About penny</a>
                <a href={`${handlepath()}/privacy${isLocal?'.html':''}`}>隱私權政策</a>
                <a href={`${handlepath()}/note${isLocal?'.html':''}`}>購物須知 | NOTICE</a>
                <a>匯款與填單 | TRANSFER</a>
            </div>
            <div>
                <a>聯絡資訊</a>
                <a>Contact Us</a>
                <a>pennypeijung@gmail.com</a>
                <a>Mon-Fri10:00-17:30(假日/例假日OFF)</a>
            </div>
        </footer>
    )
}

export default memo(Footer);