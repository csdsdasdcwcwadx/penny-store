import React from "react";
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

export default function Items(props: I_props) {
    const { img } = props;

    return (
        <a key={img.name} className={styles.Item}>
            <div className={styles.frame}><img src={img.src}/></div>
            <span className={styles.itemname}>{displayName(img.name)}</span>
        </a>
    )
}