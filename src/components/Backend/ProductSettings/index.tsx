import React, { memo, useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@Redux/Backend/store';
import { call_getallproduct } from '@Redux/Backend/actions';
import styles from './styles.module.scss';
import { handleNavigator, handleIsOff } from "@utils/commonfunction";
import LightBox, { E_direction } from "@components/Common/Modules/LightBox";
import domain from '@utils/domainByEnv';
import axios from "axios";
import InputBar, { E_RegexType } from "@components/Common/Modules/InputBar";
import { E_Page } from "@Redux/App/interfaces";
import { I_productinfo, I_productdetail } from "@Redux/Product/interface";
import PageNumber from '@components/Common/PageNumber';
import Spinner from "@components/Common/Modules/Spinner";
import cN from 'classnames';
import OptimizedImage from "@components/Common/OptimizedImage";

function ProductSettings () {
    const dispatch = useDispatch();
    const { productdetail, isLoading } = useSelector((store: RootState)=>store);
    const [open_adding, setOpen_adding] = useState(false);
    const [open_fix, setOpen_fix] = useState(false);
    const [fixItem, setFixItem] = useState<I_productinfo>();
    const [ serial, setSerial ] = useState(1);

    // 新增產品所需要用到的參數
    const p_name = useRef<HTMLInputElement>(null);
    const p_price = useRef<HTMLInputElement>(null);
    const p_amount = useRef<HTMLInputElement>(null);
    const p_type = useRef<HTMLSelectElement>(null);
    const p_size = useRef<HTMLInputElement>(null);
    const p_dentical = useRef<HTMLInputElement>(null);
    const p_info = useRef<HTMLInputElement>(null);
    const p_color = useRef<HTMLInputElement>(null);
    const [p_img, setP_img] = useState<File>();
    const [p_img2, setP_img2] = useState<File>();

    // 修改產品所需要用到的參數
    const fix_p_name = useRef<HTMLInputElement>(null);
    const fix_p_price = useRef<HTMLInputElement>(null);
    const fix_p_amount = useRef<HTMLInputElement>(null);
    const fix_p_type = useRef<HTMLSelectElement>(null);
    const fix_p_size = useRef<HTMLInputElement>(null);
    const fix_p_dentical = useRef<HTMLInputElement>(null);
    const fix_p_info = useRef<HTMLInputElement>(null);
    const fix_p_color = useRef<HTMLInputElement>(null);
    const [fix_p_img, setFix_p_img] = useState<File>();
    const [fix_p_img2, setFix_p_img2] = useState<File>();

    const handle_off = async (product: I_productinfo) => {
        if(confirm(`是否要將此產品${handleIsOff(product.p_isoff, true)}`)) {
            try{
                const {data} = await axios.post(`${domain()}/product/productsetoff`, {p_id: product.p_id});
                if(data.status) {
                    alert('商品處理成功');
                    location.reload();
                }
                else alert('商品處理失敗');
            }catch(e) {
                console.error(e);
            }
        }
    }

    const handle_delete = async (product: I_productinfo) => {
        const result = confirm('是否確認要刪除此產品 ? ');
        if(result) {
            try{
                const { data } = await axios.post<I_productdetail>(`${domain()}/product/removeproduct`, {p_id: product.p_id});
                data.message && alert(data.message);
                if(data.status) {
                    dispatch(call_getallproduct({p_type: '', currpage: serial, frombackend: true}));
                }
            }catch(err) {
                console.error(err);
            }
        }
    }

    const handle_add = useCallback(async () =>{
        const error = document.getElementsByClassName('error');
        if(error.length === 0) {
            const formData = new FormData();
            formData.append('p_dentical', p_dentical.current?.value!);
            formData.append('p_name', p_name.current?.value!);
            formData.append('p_price', p_price.current?.value!);
            formData.append('p_amount', p_amount.current?.value!);
            formData.append('p_type', p_type.current?.value!);
            formData.append('p_img', p_img!);
            formData.append('p_img2', p_img2!);
            formData.append('p_size', p_size.current?.value!);
            formData.append('p_color', p_color.current?.value!);
            formData.append('p_info', p_info.current?.value!);
            try {
                const { data } = await axios.post(`${domain()}/product/registryproduct`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                data.message && alert(data.message);
                if(data.status) {
                    location.reload();
                }
    
            }catch(err) {
                console.error(err);
            }
        }else alert(error[0].textContent);
    },[p_img, p_img2])

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
                        <InputBar title="商品編號" placeholder="請輸入商品編號" type={E_RegexType.NAME} ref={p_dentical} maxlength={8}/>
                        <InputBar title="商品名稱" placeholder="請輸入商品名稱" type={E_RegexType.NAME} ref={p_name} maxlength={20}/>
                        <InputBar title="商品價格" placeholder="請輸入商品價格" type={E_RegexType.NAME} ref={p_price} maxlength={11}/>
                        <InputBar title="商品數量" placeholder="請輸入商品數量" type={E_RegexType.NAME} ref={p_amount} maxlength={11}/>
                        <InputBar title="商品尺寸" placeholder="請輸入商品尺寸" type={E_RegexType.NAME} ref={p_size} maxlength={15}/>
                        <InputBar title="商品顏色" placeholder="請輸入商品顏色" type={E_RegexType.NAME} ref={p_color} maxlength={20}/>
                        <InputBar title="商品說明" placeholder="請輸入商品說明" type={E_RegexType.NAME} ref={p_info} unnecessary={true} maxlength={255}/>
                        <div className={styles.selection}>
                            <span>商品種類</span>
                            <select placeholder="請選擇商品種類" ref={p_type}>
                                {
                                    Object.values(E_Page).map((obj, ind) => {
                                        return obj !== E_Page.HOME && <option key={ind} value={obj}>{handleNavigator(obj as E_Page)}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <span>產品圖片1</span>
                            <input type="file" onChange={e => {
                                const file = e.target.files![0];
                                setP_img(file);
                            }}/>
                        </div>
                        <div>
                            <span>產品圖片2</span>
                            <input type="file" onChange={e => {
                                const file = e.target.files![0];
                                setP_img2(file);
                            }}/>
                        </div>
                    </div>
                    <div className={styles.buttongroup}>
                        <button onClick={handle_add}>確認</button>
                    </div>
                </div>
            </LightBox>
        )
    },[handle_add, open_adding])

    const handle_fix = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const button = e.target as HTMLElement;
        const error = button.parentNode?.parentNode?.querySelector('.error');
        if(error === null) {
            if(fixItem) {
                const formData = new FormData();
                const { p_id } = fixItem;

                formData.append('p_dentical', fix_p_dentical.current?.value!);
                formData.append('p_id', p_id);
                formData.append('p_name', fix_p_name.current?.value!);
                formData.append('p_price', fix_p_price.current?.value!);
                formData.append('p_amount', fix_p_amount.current?.value!);
                formData.append('p_type', fix_p_type.current?.value!);
                formData.append('p_img', fix_p_img!);
                formData.append('p_img2', fix_p_img2!);
                formData.append('p_size', fix_p_size.current?.value!);
                formData.append('p_color', fix_p_color.current?.value!);
                formData.append('p_info', fix_p_info.current?.value!);
                try {
                    const { data } = await axios.post(`${domain()}/product/updateproduct`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    data.message && alert(data.message);
                    if(data.status) {
                        setOpen_fix(false);
                        dispatch(call_getallproduct({p_type: '', currpage: serial, frombackend: true}));
                    }
        
                }catch(err) {
                    console.error(err);
                }
            }
        }else {
            alert(error?.textContent);
        }
    },[dispatch, fixItem, fix_p_img, serial, fix_p_img2])

    const fixBlock = useCallback(() => {
        if(fixItem) {
            const { p_name, p_price, p_amount, p_type, p_dentical, p_size, p_info, p_color } = fixItem;
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
                                title="商品編號"
                                placeholder="請輸入商品編號"
                                type={E_RegexType.NAME}
                                value={p_dentical}
                                ref={fix_p_dentical}
                                maxlength={8}/>
                            <InputBar
                                title="商品名稱"
                                placeholder="請輸入商品名稱"
                                type={E_RegexType.NAME}
                                value={p_name}
                                ref={fix_p_name}
                                maxlength={20}/>
                            <InputBar
                                title="商品價格"
                                placeholder="請輸入商品價格"
                                type={E_RegexType.NAME}
                                value={p_price}
                                ref={fix_p_price}
                                maxlength={11}/>
                            <InputBar
                                title="商品數量"
                                placeholder="請輸入商品數量"
                                type={E_RegexType.NAME}
                                value={p_amount}
                                ref={fix_p_amount}
                                maxlength={11}/>
                            <InputBar 
                                title="商品尺寸" 
                                placeholder="請輸入商品尺寸" 
                                type={E_RegexType.NAME}
                                value={p_size}
                                ref={fix_p_size}
                                maxlength={15}/>
                            <InputBar 
                                title="商品顏色" 
                                placeholder="請輸入商品顏色" 
                                type={E_RegexType.NAME}
                                value={p_color}
                                ref={fix_p_color}
                                maxlength={20}/>
                            <InputBar 
                                title="商品說明" 
                                placeholder="請輸入商品說明" 
                                type={E_RegexType.NAME}
                                value={p_info}
                                ref={fix_p_info}
                                unnecessary={true}
                                maxlength={255}/>
    
                            <div className={styles.selection}>
                                <span>商品種類</span>
                                <select placeholder="請選擇商品種類" 
                                    defaultValue={p_type}
                                    ref={fix_p_type}>
                                    {
                                        Object.values(E_Page).map((obj, ind) => {
                                            return obj !== E_Page.HOME && <option key={ind} value={obj}>{handleNavigator(obj as E_Page)}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <span>產品圖片1</span>
                                <input type="file" onChange={e => {
                                    const file = e.target.files![0];
                                    setFix_p_img(file);
                                }}/>
                            </div>
                            <div>
                                <span>產品圖片2</span>
                                <input type="file" onChange={e => {
                                    const file = e.target.files![0];
                                    setFix_p_img2(file);
                                }}/>
                            </div>
                        </div>
                        <div className={styles.buttongroup}>
                            <button onClick={e=>handle_fix(e)}>確認</button>
                        </div>
                    </div>
                </LightBox>
            )
        }
    },[fixItem, handle_fix, open_fix])

    useEffect(()=>{
        dispatch(call_getallproduct({p_type: '', currpage: serial, frombackend: true}));
    },[dispatch, serial])

    useEffect(() => {
        if(!open_fix) {
            setFixItem(undefined);
        }
    },[open_fix])

    return (
        <div className={styles.body}>
            <div className={cN(styles.productwrapper, {[styles.isLoading]: isLoading})}>
            {
                isLoading ? <Spinner/> :
                productdetail?.productinfo.map((product) => {
                    return (
                        <li key={product.p_id} className={cN(styles.product, {[styles.isoff]: product.p_isoff === 1})}>
                            <div className={styles.img}>
                                <OptimizedImage imageData={product.p_img}/>
                                <OptimizedImage imageData={product.p_img2}/>
                                <span>{handleIsOff(product.p_isoff)}</span>
                            </div>
                            <span>商品編號：{product.p_dentical}</span>
                            <span>商品名稱：{product.p_name}</span>
                            <span>商品價格：{product.p_price}元</span>
                            <span>商品種類：{handleNavigator(product.p_type as E_Page)}</span>
                            <span>商品數量：{product.p_amount}</span>
                            <span>商品尺寸：{product.p_size}</span>
                            <span>商品顏色：{product.p_color}</span>
                            <span>商品資訊：{product.p_info}</span>
                            <div className={styles.buttons}>
                                <button onClick={() => handle_delete(product)}>刪除</button>
                                <button onClick={() => {setFixItem(product); setOpen_fix(true);}}>修改</button>
                                <button onClick={() => handle_off(product)}>{handleIsOff(product.p_isoff, true)}</button>
                            </div>
                        </li>
                    )
                })
            }
            </div>
            <div className={styles.addnew} onClick={() => setOpen_adding(true)}>新增產品</div>
            {fixBlock()}
            {addingBlock()}
            {
                productdetail && <PageNumber serial={serial} setSerial={setSerial} maxpage={productdetail.pages}/>
            }
        </div>
    )
}

export default memo(ProductSettings);