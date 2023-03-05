import React, { memo } from "react";
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

    return (
        <a key={img.name} className={styles.Item} href={`${location.href}product.html`}>
            <div className={styles.frame}><img src={img.src}/></div>
            <span className={styles.itemname}>{displayName(img.name)}</span>
        </a>
    )
}

export default memo(Item);