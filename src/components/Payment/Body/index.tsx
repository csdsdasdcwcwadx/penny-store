import React, { memo, useEffect, useState, useRef } from 'react';
import domain, { handlepath } from '@utils/domainByEnv';
import axios from 'axios';
import Select from 'react-select'
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

const addressingOptions = [
    {label: '宅配', value: true},
    {label: '7-11', value: false},
]

const url = new URL (window.location.href);
const storename = url.searchParams.get('storename');
const storeaddress = url.searchParams.get('storeaddress');

const member = JSON.parse(localStorage.getItem('memberinfo')!);
const google = JSON.parse(localStorage.getItem('credentials')!);

axios.defaults.withCredentials = true;

function Body() {
    const [shoplist, setShoplist] = useState<Array<I_shoplistinfo>>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [addressing, setAddressing] = useState(true);
    const [seven, setSeven] = useState<string | null>(null);
    const [distributed, setDistributed] = useState(false);
    const name = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);
    const postcal = useRef<HTMLInputElement>(null);
    const isLocal = window.location.href.includes('localhost');
    let total = 0;

    useEffect(() => {
        window.history.pushState({}, '', window.location.href.split('?')[0]);

        if(storename && storeaddress) {
            setAddressing(false);
            setSeven(`${storename}${storeaddress}`);
        }

        if(!member && !google) {
            alert('會員尚未登入');
            window.location.href = `${handlepath()}`;
        }
        member && (async function(){
            try {
                const {data} = await axios.post<I_getshoplist>(`${domain()}/shoplist/getshoplist`);
                setShoplist(data.shoplist);
            }catch(e) {
                console.error(e);
            }
        })()
    },[])

    useEffect(() => {
        if(name.current && phone.current && member) {
            if(checked) {
                name.current.value = member.memberinfo[0].m_name;
                phone.current.value = member.memberinfo[0].m_phone;
            }else {
                name.current.value = '';
                phone.current.value = '';
            }
        }
        if(name.current && phone.current && address.current && postcal.current && member) {
            if(checked) {
                name.current.value = member.memberinfo[0].m_name;
                phone.current.value = member.memberinfo[0].m_phone;
                postcal.current.value = member.memberinfo[0].m_address.split('|')[0];
                address.current.value = member.memberinfo[0].m_address.split('|')[1];
            }else {
                name.current.value = '';
                phone.current.value = '';
                address.current.value = '';
                postcal.current.value = '';
            }
        }
    },[checked])

    const handlePayment = async (isSuccess: boolean = true) => {
        const error = document.getElementsByClassName('error');
        if(error.length === 0) {
            if(!addressing && !seven) {
                alert('請選擇7-11門市');
            } else {
                if(confirm('金流功能尚未啟用，若欲付款請洽pennypeijung@gmail.com')) {
                    const addressPost = addressing ? `${postcal.current?.value}|${address.current?.value}` : `${seven}(7-11)`
                    const post = {
                        isSuccess,
                        name: name.current?.value,
                        address: addressPost,
                        phone: phone.current?.value,
                        email: member.memberinfo[0].m_email,
                        distributed,
                    }
            
                    try{
                        const {data} = await axios.post(`${domain()}/common/payment`, post);
                        alert('訂單已送出');
                        if(data.status) window.location.href = `${handlepath()}/order${isLocal?'.html':''}`;
                    }catch(e) {
                        console.error(e);
                    }
                }
            }
        }else alert(error[0].textContent);
    }

    const handleDirect711 = async() => {
        switch (process.env.ENV) {
            case 'prod':
            case 'rel':
                window.location.href = (`https://emap.presco.com.tw/c2cemap.ashx?eshopid=870&&servicetype=3&url=https://penny.londoner.tw/common/direct&tempvar=${window.location.href}`);
                break;
            default:
                window.location.href = (`https://emap.presco.com.tw/c2cemap.ashx?eshopid=870&&servicetype=3&url=http://localhost:3638/local/common/direct&tempvar=${window.location.href}`);
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
                        <span>展開(查看購買項目)</span>
                        <i className='icon ic-ln toollistleft'/>
                    </div>
                    <section className={styles.paymentinfo}>
                        <h2>請填寫收件人資訊</h2>
                        <div className={styles.paymentcontent}>
                            <div className={styles.checkbox}>
                                <input type='checkbox' onChange={e => setChecked(e.target.checked)} 
                                    checked={checked}/>
                                <span className={styles.indicator}> </span>
                                <span>收件人資料同會員資料</span>
                            </div>
                            <div className={cN(styles.checkbox, styles.distributed)}>
                                <input type='checkbox' onChange={e => {
                                    setDistributed(e.target.checked);
                                }}/>
                                <span className={styles.indicator}> </span>
                                <span>分批出貨(若有沒有現貨的產品，是否要先寄送有現貨的產品)</span>
                            </div>
                            <InputBar title='姓名' placeholder='請輸入姓名' type={E_RegexType.NAME} ref={name} trigger={checked} maxlength={10}/>
                            <InputBar title='手機' placeholder='請輸入聯絡電話' type={E_RegexType.PHONE} ref={phone} trigger={checked} maxlength={20}/>
                            <div className={styles.selectdeliver}>
                                <span>選擇寄送方式</span>
                                <Select
                                    options={addressingOptions} 
                                    onChange={e=>{
                                        setAddressing(e?.value!);
                                        setChecked(false);
                                    }}
                                    defaultValue={addressing ? addressingOptions[0] : addressingOptions[1]}
                                />
                            </div>
                            {
                                addressing ? <div className={styles.address}>
                                    <InputBar title='郵遞區號' placeholder='請輸入郵遞區號' type={E_RegexType.NUMBER} ref={postcal} trigger={checked} maxlength={5}/>
                                    <InputBar title='地址' placeholder='請輸入收件地址' type={E_RegexType.ADDRESS} ref={address} trigger={checked} maxlength={255}/>
                                </div> : <div className={styles.addresspng} onClick={() => handleDirect711()}> 
                                    <span> </span>
                                    {seven && <span>{seven}</span>}
                                </div>
                            }
                        </div>
                    </section>
                    <button className={styles.sendpayment} onClick={() => handlePayment()}>送出訂單</button>
                    <span className={styles.alert}>金流功能尚未啟用，若欲付款請洽pennypeijung@gmail.com</span>
                    {/* <button onClick={() => handlePayment()}>付款測試用(成功)</button>
                    <button onClick={() => handlePayment(false)}>付款測試用(失敗)</button> */}
                </>
            }
        </div>
    );
}

export default memo(Body);