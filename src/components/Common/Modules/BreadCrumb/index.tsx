import React, { memo } from "react";
import styles from './styles.module.scss';

interface I_props {
    items: Array<{
        name: string;
        href: string;
        handle?: Function;
    }>
}

function BreadCrumb({ items }: I_props) {
    return (
        <div className={styles.BreadCrumb}>
            {
                items.map((item, ind) => {
                    return (
                        <span key={ind}>
                            {ind !== 0 && ' > '}
                            {item.href !== ''?<a href={item.href}>{item.name}</a>: <span>{item.name}</span>}
                        </span>
                    )
                })
            }
        </div>
    )
}

export default memo(BreadCrumb);