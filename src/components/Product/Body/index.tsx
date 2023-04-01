import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import BreadCrumb from "@components/Common/Modules/BreadCrumb";
import styles from './styles.module.scss';
import cN from 'classnames';
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { call_getdetailproduct } from '@Redux/Product/actions';
import { RootState } from '@Redux/Product/store';
import { handleIMG } from '@utils/commonfunction';
import { handleNavigator } from '@utils/commonfunction';
import { E_Page } from "@Redux/App/interfaces";
import axios from "axios";
import domain from '@utils/domainByEnv';
import { SideBar } from "..";

function Body() {
    const dispatch = useDispatch();
    const sizeOptions = [
        {label: '請選擇', value: '', isDisabled: true},
        {label: 'S號', value: 'S'},
        {label: 'M號', value: 'M'},
        {label: 'L號', value: 'L'},
    ]

    const buyOptions = [
        {label: '請選擇', value: '', isDisabled: true},
        {label: '現貨', value: 'current'},
        {label: '預購', value: 'preorder'},
    ]

    const [counter, setCounter] = useState<number>(1);
    // 尺寸
    const [selectSize, setSelectSize] = useState('');
    // 是否有現貨
    const [selectBuy, setSelectBuy] = useState('');
    // 設定sidebar產品更改
    const [trigger, setTrigger] = useState(false);
    const [alertion, setAlertion] = useState(false);
    const [lateAlert, setLateAlert] = useState(false);
    const [message, setMessage] = useState('');
    const { productdetail } = useSelector((store: RootState)=>store);
    const member = JSON.parse(localStorage.getItem('memberinfo')!);

    useEffect (() => {
        const url = new URL (window.location.href);
        dispatch(call_getdetailproduct({p_id: url.searchParams.get('p_id')}));
    },[dispatch])

    const handleBreadCrumb = () => {
        const menu = {name: '首頁', href: '/penny-store'};
        if(productdetail) return [
            menu,
            {name: handleNavigator(productdetail.productinfo[0].p_type as E_Page), href: `/penny-store?page_id=${productdetail.productinfo[0].p_type}`},
            {name: productdetail.productinfo[0].p_name, href: ''}
        ];
        else return [];
    }

    const handleAddChart = useCallback( async () => {
        if(productdetail && member) {
            const body = {
                m_id: member.memberinfo[0].m_id,
                p_id: productdetail?.productinfo[0].p_id,
                s_amount: counter,
                s_size: selectSize,
                s_buy: selectBuy,
            }

            try{
                const { data } = await axios.post(`${domain()}/shoplist/addshoplist`, body);
                setMessage(data.message);
                setAlertion(true);
                setTrigger(pre=>!pre);
                setTimeout(()=>{
                    setLateAlert(true);
                },40)
                setTimeout(()=>{
                    setLateAlert(false);
                },1500)
                setTimeout(()=>{
                    setAlertion(false);
                },2000)
            }catch(e){
                console.error(e);
            }

        } else {
            alert('請先登入會員');
        }
    },[productdetail, counter, member, selectBuy, selectSize])

    const src = useMemo(() => {
        if(productdetail) return handleIMG(productdetail.productinfo[0].p_img);
    },[productdetail])

    return (
        !productdetail ? <div>找不到商品</div> :
            <div className={styles.Body}>
                <div className={styles.breadcrumb}>
                    <BreadCrumb items={handleBreadCrumb()}/>
                </div>
                <div className={styles.productarea}>
                    <div className={styles.imgframe} onMouseMove={e=>{
                        const isMobile = document.body.clientWidth < 980;
                        if(!isMobile) {
                            const img = e.target as HTMLElement;
                            const container = img.parentNode as HTMLElement;
                            const { height, width, left, top } = container.getBoundingClientRect();

                            const lefter = width/2 - (e.clientX-left+1);
                            const topper = height/2 - (e.clientY-top+1);

                            img.style.top = `${topper}px`; // 往上是正 往下是負 56
                            img.style.left = `${lefter}px`; // 往右是負 往左是正 -116
                            img.style.scale = '2';
                        }
                    }} onMouseLeave={e=>{
                        const img = e.target as HTMLElement;
                        img.style.top = `0`;
                        img.style.left = `0`;
                        img.style.scale = '1';
                        const children = img.childNodes;

                        if(children.length > 0) {
                            const child = children[0] as HTMLElement;
                            child.style.top = `0`;
                            child.style.left = `0`;
                            child.style.scale = '1';
                        }
                    }}>
                        <img src={src}/>
                    </div>
                    <div className={styles.description}>
                        <span className={styles.productname}>{productdetail.productinfo[0].p_name}</span>
                        <span className={styles.productprice}>NT$ {productdetail.productinfo[0].p_price}</span>
                        <div className={cN(styles.selection, styles.productsize)}>
                            <span className={styles.info}>尺寸</span>
                            <div className={styles.select}>
                                <Select 
                                    options={sizeOptions} 
                                    onChange={e=>setSelectSize(e?.value || '')} 
                                    placeholder='請選擇' 
                                    isSearchable={false}
                                    theme={(theme)=>({
                                        ...theme,
                                        borderRadius: 5,
                                        colors: {
                                            ...theme.colors,
                                            primary25: "#e6cd9b",
                                            primary: "#a78a50",
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className={cN(styles.selection, styles.productbuy)}>
                        <span className={styles.info}>現貨/預購</span>
                            <div className={styles.select}>
                                <Select 
                                    options={buyOptions} 
                                    onChange={e=>setSelectBuy(e?.value || '')} 
                                    placeholder='請選擇' 
                                    isSearchable={false}
                                    theme={(theme)=>({
                                        ...theme,
                                        borderRadius: 5,
                                        colors: {
                                            ...theme.colors,
                                            primary25: "#e6cd9b",
                                            primary: "#a78a50"
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className={styles.productothers}> 
                            <div className={styles.productsums}>
                                <span className={cN(styles.minus, {[styles.disabled]: counter === 1})} onClick={()=>setCounter(pre=>{
                                    if(pre>1)return pre-1;
                                    return pre;
                                })}> </span>
                                <span className={styles.counter}>{counter}</span>
                                <span className={cN(styles.add, {[styles.disabled]: counter === productdetail.productinfo[0].p_amount})} 
                                        onClick={()=>setCounter(pre=>{
                                        if(pre<productdetail.productinfo[0].p_amount) return pre+1;
                                        return pre;
                                    })}> </span>
                            </div>
                            <button onClick={handleAddChart}>加入購物車</button>
                        </div>
                    </div>
                </div>
                <SideBar trigger={trigger}/>
                <div className={cN(styles.alertion, {[styles.show]: alertion}, {[styles.lateAlert]: lateAlert})}>{message}</div>
            </div>
    )
}

export default memo(Body);