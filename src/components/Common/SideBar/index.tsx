import React, { memo, useState } from 'react';
import cart from '../../../imgs/shopping-cart.jpg';
import styles from './styles.module.scss';
import LightBox, { E_direction } from '../Modules/LightBox';
import '../Modules/ic-ln/css.css';

function SideBar () {
    const [sidelistOpen, setSideListOpen] = useState<boolean>(false);

    return (
        <div className={styles.SideBar}>
            <div className={styles.cartframe} onClick={()=>setSideListOpen(true)}>
                <i className='icon ic-ln toolbuy'/>
            </div>
            <LightBox
                isOpen={sidelistOpen}
                handleDispatch={setSideListOpen}
                direction={'RIGHT' as E_direction}
                theName={styles.sidepage}
            >
                <div className={styles.sidepage}>
                    <div className={styles.inside}>
                        SideBar
                    </div>
                </div>
            </LightBox>
        </div>
    )
}

export default memo(SideBar);