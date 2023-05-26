import React, { memo, useEffect, useState } from 'react';
import domain, { handlepath } from '@utils/domainByEnv';
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

const member = JSON.parse(localStorage.getItem('memberinfo')!);
const google = JSON.parse(localStorage.getItem('credentials')!);

function Body() {
    const [shoplist, setShoplist] = useState<Array<I_shoplistinfo>>([]);
    const isLocal = window.location.href.includes('localhost');
    let total = 0;

    useEffect(() => {

        if(!member && !google) {
            alert('會員尚未登入');
            window.location.href = `${handlepath()}`;
        }
        member && (async function(){
            try {
                const {data} = await axios.post<I_getshoplist>(`${domain()}/shoplist/getshoplist`, {m_id: member.memberinfo[0].m_id});
                setShoplist(data.shoplist);
            }catch(e) {
                console.error(e);
            }
        })()
    },[])

    const handlePayment = async (isSuccess: boolean = true) => {
        const post = {
            isSuccess,
            name: '蔡濡安',
            account: '123456',
            money: '10000', 
            token: 'wufhwdhvl',
            shoplist,
        }
        try{
            const {data} = await axios.post(`${domain()}/common/payment`, post);
            alert(data.message);
            if(data.status) window.location.href = `${handlepath()}/order${isLocal?'.html':''}`;
        }catch(e) {
            console.error(e);
        }
    }

    return (
        member && google && <div>
            {
                shoplist.length === 0 ? <div className={styles.noitem}>目前沒有任何商品</div>:
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
                                    <span className={styles.price} data-title='單件價格'>{product.p_price}元</span>
                                    <span className={styles.amount} data-title='商品數量'>{product.s_amount}</span>
                                    <span className={styles.total} data-title='小計'>{product.p_price*product.s_amount}元</span>
                                </li>
                            )
                        })
                    }
                    <div className={styles.calculate}>
                        <span>合計</span>
                        <span> </span>
                        <span> </span>
                        <span className={styles.totalcalculation}>{total}元</span>
                    </div>
                    <button onClick={() => handlePayment()}>付款測試用(成功)</button>
                    <button onClick={() => handlePayment(false)}>付款測試用(失敗)</button>
                </div>
            }
        </div>
    );
}

export default memo(Body);