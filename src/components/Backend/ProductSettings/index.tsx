import React, { memo, useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@Redux/Backend/store';
import { call_getallproduct } from '@Redux/Backend/actions';
import styles from './styles.module.scss';
import { handleNavigator, handleIMG } from "@utils/commonfunction";
import LightBox, { E_direction } from "@components/Common/Modules/LightBox";
import domain from '@utils/domainByEnv';
import axios from "axios";
import InputBar, { E_RegexType } from "@components/Common/Modules/InputBar";
import { E_Page } from "@Redux/App/interfaces";
import { I_productinfo, I_productdetail } from "@Redux/Product/interface";

function ProductSettings () {
    const dispatch = useDispatch();
    const { productdetail } = useSelector((store: RootState)=>store);
    const [open_adding, setOpen_adding] = useState(false);
    const [open_fix, setOpen_fix] = useState(false);
    const [p_img, setP_img] = useState<File>();
    const [fixItem, setFixItem] = useState<I_productinfo>();

    const p_name = useRef<HTMLInputElement>(null);
    const p_price = useRef<HTMLInputElement>(null);
    const p_amount = useRef<HTMLInputElement>(null);
    const p_type = useRef<HTMLSelectElement>(null);

    const fix_p_name = useRef<HTMLInputElement>(null);
    const fix_p_price = useRef<HTMLInputElement>(null);
    const fix_p_amount = useRef<HTMLInputElement>(null);
    const fix_p_type = useRef<HTMLSelectElement>(null);

    const handle_delete = async (product: I_productinfo) => {
        try{
            const { data } = await axios.post<I_productdetail>(`${domain()}/product/removeproduct`, {p_id: product.p_id});
            alert(data.message);
            if(data.status) {
                dispatch(call_getallproduct(''));
            }
        }catch(err) {
            console.error(err);
        }
    }

    const handle_add = useCallback(async () =>{
        if(document.getElementsByClassName('error').length === 0) {
            const body = {
                p_name: p_name.current?.value,
                p_price: p_price.current?.value,
                p_amount: p_amount.current?.value,
                p_type: p_type.current?.value,
            }
            const formData = new FormData();
            formData.append('p_name', p_name.current?.value!);
            formData.append('p_price', p_price.current?.value!);
            formData.append('p_amount', p_amount.current?.value!);
            formData.append('p_type', p_type.current?.value!);
            formData.append('p_img', p_img!);
            // try {
            //     const { data } = await axios.post(`${domain()}/product/registryproduct`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data'
            //         }
            //     });
            //     console.log(data)
    
            // }catch(err) {
            //     console.error(err);
            // }
            try {
                const { data } = await axios.post<I_productdetail>(`${domain()}/product/registryproduct`, body);
                if(data.status) {
                    setOpen_adding(false);
                    dispatch(call_getallproduct(''));
                }
            }catch(err) {
                console.error(err);
            }
        }
    },[p_img, dispatch])

    const addingBlock = useCallback(() => {
        return (
            <LightBox 
                isOpen = {open_adding}
                handleDispatch = {setOpen_adding}
                direction = {E_direction.TOP}
                theName = {styles.addingBlock}
            >
                <div className={styles.addingBlock}>
                    <div className={styles.input}>
                        <InputBar title="商品名稱" placeholder="請輸入商品名稱" type={E_RegexType.NAME} ref={p_name}/>
                        <InputBar title="商品價格" placeholder="請輸入商品價格" type={E_RegexType.NAME} ref={p_price}/>
                        <InputBar title="商品數量" placeholder="請輸入商品數量" type={E_RegexType.NAME} ref={p_amount}/>
                        <div className={styles.selection}>
                            <span>商品種類</span>
                            <select placeholder="請選擇商品種類" ref={p_type}>
                                {
                                    Object.values(E_Page).map((obj, ind) => {
                                        return <option key={ind} value={obj}>{handleNavigator(obj as E_Page)}</option>
                                    })
                                }
                            </select>
                        </div>
                        <input type="file" onChange={e => {
                            const file = e.target.files![0];
                            setP_img(file);
                        }}/>
                    </div>
                    <div className={styles.buttongroup}>
                        <button onClick={handle_add}>確認</button>
                    </div>
                </div>
            </LightBox>
        )
    },[handle_add, open_adding])

    const handle_fix = useCallback(async () => {
        if(fixItem) {
            const { p_id } = fixItem;
            const body = {
                p_id: p_id,
                p_name: fix_p_name.current?.value,
                p_price: fix_p_price.current?.value,
                p_amount: fix_p_amount.current?.value,
                p_type: fix_p_type.current?.value,
            }

            try {
                const { data } = await axios.post(`${domain()}/product/updateproduct`, body);
                if(data.status) {
                    setOpen_fix(false);
                    dispatch(call_getallproduct(''));
                }
    
            }catch(err) {
                console.error(err);
            }   
        }
    },[dispatch, fixItem])

    const fixBlock = useCallback(() => {
        if(fixItem) {
            const { p_name, p_price, p_amount, p_type } = fixItem;
            return (
                <LightBox
                    isOpen = {open_fix}
                    handleDispatch = {setOpen_fix}
                    direction = {E_direction.TOP}
                    theName = {styles.fixBlock}
                >
                    <div className={styles.fixBlock}>
                        <div className={styles.input}>
                            <InputBar
                                title="商品名稱"
                                placeholder="請輸入商品名稱"
                                type={E_RegexType.NAME}
                                value={p_name}
                                ref={fix_p_name}/>
                            <InputBar
                                title="商品價格"
                                placeholder="請輸入商品價格"
                                type={E_RegexType.NAME}
                                value={p_price}
                                ref={fix_p_price}/>
                            <InputBar
                                title="商品數量"
                                placeholder="請輸入商品數量"
                                type={E_RegexType.NAME}
                                value={p_amount}
                                ref={fix_p_amount}/>
    
                            <div className={styles.selection}>
                                <span>商品種類</span>
                                <select placeholder="請選擇商品種類" 
                                    defaultValue={p_type}
                                    ref={fix_p_type}>
                                    {
                                        Object.values(E_Page).map((obj, ind) => {
                                            const defaultOptionValue = p_type;
                                            return <option key={ind} value={obj} selected={defaultOptionValue === obj}>{handleNavigator(obj as E_Page)}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <input type="file" onChange={e => {
                                const file = e.target.files![0];
                                setP_img(file);
                            }}/>
                        </div>
                        <div className={styles.buttongroup}>
                            <button onClick={handle_fix}>確認</button>
                        </div>
                    </div>
                </LightBox>
            )
        }
    },[fixItem, handle_fix, open_fix])

    useEffect(()=>{
        dispatch(call_getallproduct(''));
    },[dispatch])

    useEffect(() => {
        if(!open_fix) {
            setFixItem(undefined);
        }
    },[open_fix])

    return (
        <div className={styles.body}>
            <div className={styles.productwrapper}>
            {
                productdetail?.productinfo.map((product) => {
                    return (
                        <li key={product.p_id} className={styles.product}>
                            <img src={handleIMG(product.p_img)}/>
                            <span>{product.p_name}</span>
                            <span>商品價格：{product.p_price}元</span>
                            <span>商品種類：{handleNavigator(product.p_type as E_Page)}</span>
                            <span>商品數量：{product.p_amount}</span>
                            <div className={styles.buttons}>
                                <button onClick={() => handle_delete(product)}>刪除</button>
                                <button onClick={() => {setFixItem(product); setOpen_fix(true);}}>修改</button>
                            </div>
                        </li>
                    )
                })
            }
            </div>
            <div className={styles.addnew} onClick={() => setOpen_adding(true)}>新增產品</div>
            {fixBlock()}
            {addingBlock()}
        </div>
    )
}

export default memo(ProductSettings);