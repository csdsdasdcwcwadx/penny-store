import React, { memo, useEffect, useState } from 'react';
import cart from '../../../imgs/shopping-cart.jpg';
import styles from './styles.module.scss';
import cN from 'classnames';

function SideBar () {
    const [sidelistOpen, setSideListOpen] = useState<boolean>(false);

    useEffect(()=>{
        const { body } = document;
        if(sidelistOpen) {
            const sidepage = document.querySelector('.sidepage');
            sidepage?.setAttribute('style', 'display: block');
            body.classList.add(styles.setpage);
            setTimeout(()=>{
                sidepage?.classList.add(styles.show);
            },50)
        }
        if(!sidelistOpen) {
            const sidepage = document.querySelector('.sidepage');
            sidepage?.classList.remove(styles.show);
            setTimeout(()=>{
                body.classList.remove(styles.setpage);
                sidepage?.removeAttribute('style');
            },500)
        }
    },[sidelistOpen])

    return (
        <div className={styles.SideBar}>
            <div className={styles.cartframe} onClick={()=>setSideListOpen(true)}>
                <img src={cart}/>
            </div>
            <div className={cN('sidepage', styles.sidepage)}>
                <span className={cN(styles.close)} onClick={()=>setSideListOpen(false)}>叉叉</span>
                <div className={styles.inside}>
                    SideBar
                </div>
            </div>
            <div className={cN({[styles.background]:sidelistOpen})} onClick={()=>setSideListOpen(false)}> </div>
        </div>
    )
}

export default memo(SideBar);