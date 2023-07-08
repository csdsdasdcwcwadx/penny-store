import React, { memo } from "react";
import styles from './styles.module.scss';
import { handlepath } from "@utils/domainByEnv";

function Footer () {
    const isLocal = window.location.href.includes('localhost');

    return (
        <footer className={styles.Footer}>
            <div>
                <a>About Us</a>
                <a href={`${handlepath()}/privacy${isLocal?'.html':''}`}>隱私權政策</a>
                <a href={`${handlepath()}/note${isLocal?'.html':''}`}>購物須知 | NOTICE</a>
            </div>
            <div>
                <a href="https://www.instagram.com/londoner.tw/">Contact Us</a>
                <a>londoner.tw2020@gmail.com</a>
                <a>Mon-Fri10:00-17:30(假日/例假日OFF)</a>
            </div>
        </footer>
    )
}

export default memo(Footer);