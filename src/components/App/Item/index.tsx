import React, { memo, useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss';

interface I_props {
    img: {
        name: string;
        src: string;
    }
}

const displayName = (name: string)=> {
    return name.replace(/\.[^/.]+$/, "");
}

function Item(props: I_props) {
    const { img } = props;
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
        <a key={img.name} className={styles.Item} href={href}>
            <div className={styles.frame}><img src={img.src}/></div>
            <span className={styles.itemname}>{displayName(img.name)}</span>
        </a>
    )
}

export default memo(Item);