import React, { memo, useRef } from "react";
import cN from 'classnames';
import styles from './styles.module.scss';
import Nums from "./Nums";

interface I_props {
    maxpage: number;
    serial: number;
    setSerial: Function;
    typeIn?: boolean;
}

function PageNumber ({setSerial, maxpage, serial, typeIn}: I_props) {
    const page = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.pages}>
            <div className={styles.pagenumber}>
                <Nums num={serial-2} click={setSerial} maxpage={maxpage} serial={serial}/>
                <Nums num={serial-1} click={setSerial} maxpage={maxpage} serial={serial}/>
                <Nums num={serial} click={setSerial} maxpage={maxpage} serial={serial}/>
                <Nums num={serial+1} click={setSerial} maxpage={maxpage} serial={serial}/>
                <Nums num={serial+2} click={setSerial} maxpage={maxpage} serial={serial}/>
                <div>......</div>
                <Nums num={maxpage} click={setSerial} maxpage={maxpage}/>
            </div>
            {
                typeIn && <div>
                    <input type="text" placeholder="請輸入頁碼" ref={page} onKeyUp={e=>{
                        if(e.code !== "Enter") return;
                        if(isNaN(parseInt(page.current?.value!))) return;
                        if(parseInt(page.current?.value!) <= 0 || parseInt(page.current?.value!) > maxpage) return;
                        setSerial(parseInt(page.current?.value!));
                        // if(page.current) page.current.value = '';
                    }}/>
                </div>
            }
        </div>
    )
}

export default memo(PageNumber);