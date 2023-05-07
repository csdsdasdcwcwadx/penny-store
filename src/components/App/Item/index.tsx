import React, { memo } from "react";
import styles from './styles.module.scss';
import { I_productinfo } from '@Redux/Product/interface';
import { handleIMG } from "@utils/commonfunction"; 
import { handlepath } from "@utils/domainByEnv";

interface I_props {
    info: I_productinfo
}

function Item(props: I_props) {
    const { info } = props;
    const { p_id, p_name, p_price, p_amount, p_img, p_type, p_dentical } = info;
    const isLocal = window.location.href.includes('localhost');

    return (
        <a className={styles.Item} href={`${handlepath()}/product${isLocal?'.html':''}?p_dentical=${p_dentical}`}>
            <div className={styles.frame}>
                {info && <img src={handleIMG(p_img)}/>}
            </div>
            <span className={styles.itemname}>{p_name}</span>
        </a>
    )
}

export default memo(Item);