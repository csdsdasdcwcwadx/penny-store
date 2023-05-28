import React, { memo, useEffect, useState, useRef } from 'react';
import domain, { handlepath } from '@utils/domainByEnv';
import axios from 'axios';
import { I_productinfo } from '@Redux/Product/interface';
import styles from './styles.module.scss';
import { handleIMG } from '@utils/commonfunction';
import InputBar, { E_RegexType } from '@components/Common/Modules/InputBar';
import cN from 'classnames';
import '@components/Common/Modules/ic-ln/css.css';

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
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const name = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);
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

    useEffect(() => {
        if(name.current && phone.current && address.current && member) {
            if(checked) {
                name.current.value = member.memberinfo[0].m_name;
                phone.current.value = member.memberinfo[0].m_phone;
                address.current.value = member.memberinfo[0].m_address;
            }else {
                name.current.value = '';
                phone.current.value = '';
                address.current.value = '';
            }
        }
    },[checked])

    const handlePayment = async (isSuccess: boolean = true) => {
        const post = {
            isSuccess,
            name: name.current?.value,
            address: address.current?.value,
            phone: phone.current?.value,
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
                <>
                    <div className={cN(styles.shoplist, {[styles.isclose]: !isOpen})}>
                        <div className={styles.title}>
                            <span className={styles.name}>商品名稱</span>
                            <span className={styles.price}>單件價格</span>
                            <span>商品顏色</span>
                            <span>商品尺寸</span>
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
                                        <span data-title='商品顏色'>{product.p_color}</span>
                                        <span data-title='商品尺寸'>{product.p_size}</span>
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
                            <span> </span>
                            <span> </span>
                            <span className={styles.totalcalculation}>{total}元</span>
                        </div>
                    </div>
                    <div className={cN(styles.openshoplist, {[styles.isclose]: !isOpen})} onClick={() => {
                        setIsOpen(pre=>!pre);
                    }}>
                        <span>展開</span>
                        <i className='icon ic-ln toollistleft'/>
                    </div>
                    <section className={styles.paymentinfo}>
                        <h2>請填寫收件人資訊</h2>
                        <div className={styles.paymentcontent}>
                            <div className={styles.checkbox}>
                                <input type='checkbox' onChange={e => {
                                    setChecked(e.target.checked);

                                }}/>
                                <span className={styles.indicator}> </span>
                                <span>收件人資料同會員資料</span>
                            </div>
                            <InputBar title='姓名' placeholder='請輸入姓名' type={E_RegexType.NAME} ref={name} trigger={checked} maxlength={10}/>
                            <InputBar title='手機' placeholder='請輸入聯絡電話' type={E_RegexType.PHONE} ref={phone} trigger={checked} maxlength={20}/>
                            <InputBar title='地址' placeholder='請輸入收件地址' type={E_RegexType.ADDRESS} ref={address} trigger={checked} maxlength={255}/>
                        </div>
                    </section>
                    <button onClick={() => handlePayment()}>付款測試用(成功)</button>
                    <button onClick={() => handlePayment(false)}>付款測試用(失敗)</button>
                </>
            }
        </div>
    );
}

export default memo(Body);