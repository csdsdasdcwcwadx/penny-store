import React, { memo, useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss';
import { I_productinfo } from '@Redux/App/interfaces';
import { handleIMG } from "@utils/commonfunction"; 

interface I_props {
    info: I_productinfo
}

function Item(props: I_props) {
    const { info } = props;
    const { p_id, p_name, p_price, p_amount, p_img, p_type } = info;
    const isLocal = window.location.href.includes('localhost');

    return (
        <a className={styles.Item} href={`/penny-store/product${isLocal?'.html':''}?p_id=${p_id}`}>
            <div className={styles.frame}>
                {info && <img src={handleIMG(p_img)}/>}
            </div>
            <span className={styles.itemname}>{p_name}</span>
        </a>
    )
}

export default memo(Item);