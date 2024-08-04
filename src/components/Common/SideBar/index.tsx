import React, { memo, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import LightBox, { E_direction } from '../Modules/LightBox';
import '../Modules/ic-ln/css.css';
import domain, {handlepath} from '@utils/domainByEnv';
import axios from 'axios';
import { I_productinfo } from '@Redux/Product/interface';
import { useMediaQuery } from 'react-responsive';
import cN from 'classnames';
import PubSub from 'pubsub-js';
import OptimizedImage from '../OptimizedImage';

interface I_shoplistinfo extends I_productinfo {
    s_amount: number;
    s_id: string;
}

interface I_getshoplist {
    message: string;
    status: boolean;
    shoplist: Array<I_shoplistinfo>;
}

interface I_props {
    trigger?: boolean;
}

function SideBar ({trigger}: I_props) {
    const [sidelistOpen, setSideListOpen] = useState<boolean>(false);
    const [shoplist, setShoplist] = useState<Array<I_shoplistinfo>>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const isLocal = window.location.href.includes('localhost');
    let total = 0;

    PubSub.subscribe('opensidebar', ()=>{
        setSideListOpen(true);
    })

    useEffect(() => {
        PubSub.subscribe('isLogin', ()=>{
            setIsLogin(true);
        })
    },[])

    useEffect(() => {
        isLogin && (async function(){
            setIsLogin(true);
            try {
                const {data} = await axios.post<I_getshoplist>(`${domain()}/shoplist/getshoplist`);
                setShoplist(data.shoplist);
            }catch(e) {
                console.error(e);
            }
        })()
    },[trigger, isLogin])

    const deleteProduct = async (id: string) => {
        try {
            const { data } = await axios.post(`${domain()}/shoplist/updateshoplist`, {s_id: id})
            if(data.status){
                setShoplist(pre=>{
                    return pre.filter((obj)=>obj.s_id !== id);
                })
            }
        }catch(e) {
            console.error(e);
        }
    }

    const sideBarAvailable = () => {
        if(isLogin)setSideListOpen(true);
        else {
            alert('請先登入會員');
            PubSub.publish('openLogin', true);
        }
    }

    return (
        <div className={styles.SideBar}>
            <div className={styles.cartframe} onClick={sideBarAvailable} data-number={shoplist.length}>
                <i className='icon ic-ln toolbuy'/>
            </div>
            <LightBox
                isOpen={sidelistOpen}
                handleDispatch={setSideListOpen}
                direction={'RIGHT' as E_direction}
                theName={styles.sidepage}
                isOverflow={true}
            >
                <div className={cN(styles.sidepage, {[styles.isMobile]: isMobile})}>
                    {
                        shoplist.length !== 0 ? <div>
                            {
                                shoplist.map((product) => {
                                    const dollar = product.p_price*product.s_amount;
                                    total += dollar;
                                    return (
                                        <li key={product.p_id}>
                                            <div className={styles.productlist}>
                                                <a href={`${handlepath()}/product.html?p_dentical=${product.p_dentical}`}>
                                                    <OptimizedImage src={product.p_img}/>
                                                    <div className={styles.productcontent}>
                                                        <p>{product.p_name}({product.p_color})</p>
                                                        <div className={styles.detailinfo}>
                                                            <span>x {product.s_amount}件 </span>
                                                            <span> 共<span>{dollar}</span>元</span>
                                                            {product.p_size && <span> {product.p_size}號</span>}
                                                        </div>
                                                    </div>
                                                </a>
                                                <i className='icon ic-ln tool_trash-f' onClick={()=>deleteProduct(product.s_id)}/>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                            <button onClick={()=>window.location.href = `${handlepath()}/payment.html`}>
                                前往結帳
                                <div className={styles.producttotal}>小計 
                                <span>{total}</span> 元</div>
                            </button>
                        </div> : <span>尚未選擇商品</span>
                    }
                </div>
            </LightBox>
        </div>
    )
}

export default memo(SideBar);