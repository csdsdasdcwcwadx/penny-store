import React, { memo, useEffect, useState } from 'react';
import domain from '@utils/domainByEnv';
import axios from 'axios';
import { I_productinfo } from '@Redux/Product/interface';
import styles from './styles.module.scss';
import { handleIMG } from '@utils/commonfunction';

interface I_shoplistinfo extends I_productinfo {
    s_amount: number;
    m_id: string;
    s_id: string;
}

interface I_getshoplist {
    message: string;
    status: boolean;
    shoplist: Array<I_shoplistinfo>;
}

function Body() {
    const [shoplist, setShoplist] = useState<Array<I_shoplistinfo>>([]);
    const [toggleState, setToggleState] = useState(false);
    let total = 0;

    useEffect(() => {
        const member = JSON.parse(localStorage.getItem('memberinfo')!);
        member && (async function(){
            try {
                const {data} = await axios.post<I_getshoplist>(`${domain()}/shoplist/getshoplist`, {m_id: member.memberinfo[0].m_id});
                setShoplist(data.shoplist);
            }catch(e) {
                console.error(e);
            }
        })()
    },[])
    console.log(shoplist)
    return (
        <div>
            <div className={styles.shoplist}>
                <div className={styles.title}>
                    <span className={styles.name}>商品名稱</span>
                    <span className={styles.price}>單件價格</span>
                    <span className={styles.amount}>商品數量</span>
                    <span className={styles.total}>小計</span>
                </div>
                {
                    shoplist.map((product)=>{
                        const dollar = product.p_price*product.s_amount;
                        total += dollar;
                        return (
                            <li key={product.p_id}>
                                <span className={styles.name}>
                                    <img src={handleIMG(product.p_img)}/>
                                    {product.p_name}
                                </span>
                                <span className={styles.price} data-title='單件價格'>{product.p_price}</span>
                                <span className={styles.amount} data-title='商品數量'>{product.s_amount}</span>
                                <span className={styles.total} data-title='小計'>{product.p_price*product.s_amount}</span>
                            </li>
                        )
                    })
                }
                <div className={styles.calculate}>
                    <span>總共</span>
                    <span> </span>
                    <span> </span>
                    <span className={styles.totalcalculation}>{total}</span>
                </div>
            </div>
        </div>
    );
}

export default memo(Body);