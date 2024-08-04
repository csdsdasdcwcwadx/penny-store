import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import BreadCrumb from "@components/Common/Modules/BreadCrumb";
import styles from './styles.module.scss';
import cN from 'classnames';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { call_getdetailproduct } from '@Redux/Product/actions';
import { RootState } from '@Redux/Product/store';
import { handleNavigator } from '@utils/commonfunction';
import { E_Page } from "@Redux/App/interfaces";
import axios from "axios";
import domain, { handlepath } from '@utils/domainByEnv';
import Spinner from "@components/Common/Modules/Spinner";
import { useMediaQuery } from 'react-responsive';
import PubSub from 'pubsub-js';
import OptimizedImage from "@components/Common/OptimizedImage";

axios.defaults.withCredentials = true;

interface I_props {
    setTrigger: Function;
}

function Body({setTrigger}: I_props) {
    const dispatch = useDispatch();

    const [counter, setCounter] = useState<number>(1);
    // 尺寸
    const [selectSize, setSelectSize] = useState('');
    // 顏色
    const [selectColor, setselectColor] = useState('');
    const [alertion, setAlertion] = useState(false);
    const [lateAlert, setLateAlert] = useState(false);
    const [message, setMessage] = useState('');
    // 設定購買提示
    const [goBuy, setGoBuy] = useState(false);
    const { productdetail } = useSelector((store: RootState)=>store);
    const member = localStorage.getItem('token');
    const isMobile = useMediaQuery({ query: '(max-width: 980px)' });
    const isLocal = window.location.href.includes('localhost');

    const sizeOptions = useMemo(() => {
        const options = [{label: '請選擇', value: '', isDisabled: true, id: ''}];
        if(productdetail) {
            const { productinfo } = productdetail!;
            productinfo.forEach((product) => {
                if(!options.find(e=>e.value === product.p_size)) {
                    options.push({label: product.p_size, value: product.p_size, isDisabled: false, id: product.p_id})
                }
            })
        }
        return options;
    },[productdetail])

    const colorOptions = useMemo(() => {
        const options = [{label: '請選擇', value: '', isDisabled: true, id: ''}];
        if(productdetail) {
            const { productinfo } = productdetail!;
            productinfo.forEach((product) => {
                if(!options.find(e=>e.value === product.p_color)) {
                    options.push({label: product.p_color, value: product.p_color, isDisabled: false, id: product.p_id})
                }
            })

        }
        return options;
    },[productdetail])

    useEffect(() => {
        goBuy && setTimeout(() => {
            setGoBuy(false);
        }, 10000)
    }, [goBuy])

    useEffect (() => {
        const url = new URL (window.location.href);
        dispatch(call_getdetailproduct({p_dentical: url.searchParams.get('p_dentical')}));
    },[dispatch])

    const handleBreadCrumb = () => {
        const menu = {name: '首頁', href: handlepath()};
        if(productdetail) return [
            menu,
            {name: handleNavigator(productdetail.productinfo[0].p_type as E_Page), href: `${handlepath()}?page_id=${productdetail.productinfo[0].p_type}`},
            {name: productdetail.productinfo[0].p_name, href: ''}
        ];
        else return [];
    }
    
    const chosenItem = useMemo(() => {
        if(productdetail) {
            const chosen = productdetail.productinfo.find(e=>{
                return e.p_color === selectColor && e.p_size === selectSize;
            })
            return chosen;
        }
        return undefined;
    },[productdetail, selectColor, selectSize])

    const handleAddChart = useCallback( async (buyImm: boolean) => {

        if(!chosenItem) {
            alert('請選擇其他產品尺寸及顏色');
            return;
        }

        if(productdetail && member) {
            const body = {
                p_id: chosenItem?.p_id,
                s_amount: counter,
                restrict: chosenItem!.p_amount,
            }

            try{
                const { data } = await axios.post(`${domain()}/shoplist/addshoplist`, body);
                if(data.status) {
                    isMobile && PubSub.publish('opensidebar', data.status);
                    setGoBuy(true);
                    setMessage(data.message);
                    setAlertion(true);
                    setTrigger((pre: any)=>!pre);
                    setTimeout(()=>{
                        setLateAlert(true);
                    },40)
                    setTimeout(()=>{
                        setLateAlert(false);
                    },1500)
                    setTimeout(()=>{
                        setAlertion(false);
                    },2000)
                    setCounter(1);
                    if(buyImm) window.location.href = `${handlepath()}/payment.html`;
                }else{
                    if(data.message === null) {
                        if(confirm('此商品目前現貨不足，是否要等候預購(約15-20個工作天)')) {
                            const { data } = await axios.post(`${domain()}/shoplist/addshoplist`, {...body, pass: true});
                            if(data.status) {
                                isMobile && PubSub.publish('opensidebar', data.status);
                                setGoBuy(true);
                                setMessage(data.message);
                                setAlertion(true);
                                setTrigger((pre: any)=>!pre);
                                setTimeout(()=>{
                                    setLateAlert(true);
                                },40)
                                setTimeout(()=>{
                                    setLateAlert(false);
                                },1500)
                                setTimeout(()=>{
                                    setAlertion(false);
                                },2000)
                                setCounter(1);
                                if(buyImm) window.location.href = `${handlepath()}/payment.html`;
                            } else {
                                alert(data.message);
                            }
                        }
                    } else {
                        alert(data.message);
                    }
                }
            }catch(e){
                console.error(e);
            }

        } else {
            alert('請先登入會員');
            PubSub.publish('openLogin', true);
        }
    },[productdetail, member, chosenItem, counter, setTrigger, isMobile])

    const src = useMemo(() => {
        if(productdetail) {
            document.title = productdetail.productinfo[0].p_name || 'Londoner';
            return <OptimizedImage src={productdetail.productinfo[0].p_img}/>
        }
    },[productdetail])

    return (
        !productdetail ? <Spinner/> :
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

                            if((width/2 - Math.abs(lefter) > 1) && (height/2 - Math.abs(topper) > 1) ) {
                                img.style.top = `${topper}px`; // 往上是正 往下是負 56
                                img.style.left = `${lefter}px`; // 往右是負 往左是正 -116
                                img.style.scale = '2';
                            }
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
                        {src}
                    </div>
                    <div className={styles.description}>
                        <span className={styles.productname}>
                            <h1>{productdetail.productinfo[0].p_name}</h1>
                            {
                                chosenItem && chosenItem.p_amount <= 5 && 
                                    <span className={styles.productleft}>{chosenItem.p_amount > 0 ? `商品數量剩餘 : ${chosenItem.p_amount}` : '目前尚無現貨，預購天數約15-20個工作天'}</span>
                            }
                        </span>
                        <span className={styles.productprice}>NT$ {chosenItem?.p_price || productdetail.productinfo[0].p_price}</span>
                        {
                            productdetail.productinfo[0].p_size && <div className={cN(styles.selection, styles.productsize)}>
                                <span className={styles.info}>尺寸</span>
                                <div className={styles.select}>
                                    <Select
                                        options={sizeOptions} 
                                        onChange={e=>setSelectSize(e?.value!)} 
                                        placeholder='請選擇' 
                                        isSearchable={false}
                                        theme={(theme)=>({
                                            ...theme,
                                            borderRadius: 5,
                                            colors: {
                                                ...theme.colors,
                                                primary25: "#d4d2c8",
                                                primary: "#727171"
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        }
                        <div className={cN(styles.selection, styles.productbuy)}>
                            <span className={styles.info}>顏色</span>
                            <div className={styles.select}>
                                <Select 
                                    options={colorOptions} 
                                    onChange={e=>setselectColor(e?.value!)} 
                                    placeholder='請選擇' 
                                    isSearchable={false}
                                    theme={(theme)=>({
                                        ...theme,
                                        borderRadius: 5,
                                        colors: {
                                            ...theme.colors,
                                            primary25: "#d4d2c8",
                                            primary: "#727171"
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
                                <span className={cN(styles.add)} 
                                        onClick={()=>setCounter(pre=>{
                                        return pre+1;
                                    })}> </span>
                            </div>
                            <button onClick={()=>handleAddChart(false)}>加入購物車</button>
                            <button onClick={()=>handleAddChart(true)}>直接購買</button>
                        </div>
                    </div>
                </div>
                <aside className={cN(styles.goBuy, {[styles.show]: goBuy})}>
                    <span>商品已加入購物車</span>
                    <div>
                        <button onClick={()=>setGoBuy(false)}>繼續逛逛</button>
                        <button onClick={()=>window.location.href = `${handlepath()}/payment.html`}>前往結帳</button>
                    </div>
                </aside>
                <div className={cN(styles.alertion, {[styles.show]: alertion}, {[styles.lateAlert]: lateAlert})}>{message}</div>
                <div className={styles.desinfo} dangerouslySetInnerHTML={{ __html: chosenItem?.p_info || productdetail.productinfo[0].p_info }}/>
            </div>
    )
}

export default memo(Body);