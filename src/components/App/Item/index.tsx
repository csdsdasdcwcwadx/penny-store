import React, { memo } from "react";
import styles from './styles.module.scss';
import { I_productinfo } from '@Redux/Product/interface';
import { handlepath } from "@utils/domainByEnv";
import axios from "axios";
import domain from '@utils/domainByEnv';
import OptimizedImage from "@components/Common/OptimizedImage";

interface I_props {
    info: I_productinfo
}

function Item(props: I_props) {
    const { info } = props;
    const { p_id, p_name, p_img, p_img2, p_dentical, p_info } = info;
    const isLocal = window.location.href.includes('localhost');

    const handleClick = async () => {
        try {
            await axios.post(`${domain()}/product/addproductclicking`, {p_id});
        }catch(e) {
            console.error(e);
        }
    }

    return (
        <a className={styles.Item} href={`${handlepath()}/product.html?p_dentical=${p_dentical}`} onClick={handleClick}>
            <div className={styles.frame}>
                <OptimizedImage src={p_img}/>
                <OptimizedImage src={p_img2}/>
            </div>
            <span className={styles.itemname}>{p_name}</span>
        </a>
    )
}

export default memo(Item);