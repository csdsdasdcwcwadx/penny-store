import React, { memo, useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss';
import { I_productinfo } from '@Redux/App/interfaces';

interface I_props {
    info: I_productinfo
}

const displayName = (name: string)=> {
    return name.replace(/\.[^/.]+$/, "");
}

function Item(props: I_props) {
    const { info } = props;
    const [isLocal, setIsLocal] = useState<boolean>(false);
    const href = useMemo(()=>{
        if(isLocal){
            return `${location.href}/product.html`;
        }
        return `${location.href}product.html`;
    },[isLocal])

    useEffect(()=>{
        const local = process.env.ENV === "local";
        setIsLocal(local);
    },[])

    return (
        <a className={styles.Item} href={href}>
            <div className={styles.frame}>{info && <img src={URL.createObjectURL(new Blob([info.p_img]))}/>}</div>
            <span className={styles.itemname}>{info.p_name}</span>
        </a>
    )
}

export default memo(Item);