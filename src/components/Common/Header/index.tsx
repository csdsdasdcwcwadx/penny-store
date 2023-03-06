import React, { memo, useState, useEffect } from "react";
import styles from './styles.module.scss';
import { useDispatch } from "react-redux";
import { setPage } from '@Redux/App/actions';
import { E_Page } from '@Redux/App/interfaces';
// import './index.scss';
import cN from 'classnames';

function Header() {
    const [listOpen, setListOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    const ListBlock = ()=>{
        return (
            <ul>
                <li onClick={()=>dispatch(setPage(E_Page.HOME))}>Home</li>
                <li onClick={()=>dispatch(setPage(E_Page.SHOPALL))}>全部商品 | SHOP ALL</li>
                <li onClick={()=>dispatch(setPage(E_Page.SALE))}>優惠專區 | SALE</li>
                <li onClick={()=>dispatch(setPage(E_Page.RESTOCK))}>熱騰騰現貨 | RESTOCK</li>
                <li onClick={()=>dispatch(setPage(E_Page.WEAR))}>穿搭筆記本 | WEAR</li>
                <li onClick={()=>dispatch(setPage(E_Page.MORE))}>更多</li>
            </ul>
        )
    }

        
    useEffect(()=>{
        const { body } = document;
        if(listOpen) {
            const listpage = document.querySelector('.listpage');
            listpage?.setAttribute('style', 'display: block');
            body.classList.add(styles.setpage);
            setTimeout(()=>{
                listpage?.classList.add(styles.show);
            },50)
        }
        if(!listOpen) {
            const listpage = document.querySelector('.listpage');
            listpage?.classList.remove(styles.show);
            setTimeout(()=>{
                body.classList.remove(styles.setpage);
                listpage?.removeAttribute('style');
            },500)
        }
    },[listOpen])

    return (
        <>
            <div className={styles.Header}>
                <div>
                    <span className={styles.show} onClick={()=>setListOpen(true)}>展開</span>
                    <span>fb</span>
                    <span>IG</span>
                </div>
                <div className={styles.logo}>
                    PENNY_SHOP
                </div>
                <div>
                    <span className={styles.show}>seh</span>
                    <span>會員登入</span>
                    <span>sp</span>
                </div>
            </div>
            <div className={styles.Navigator}>
                {ListBlock()}
            </div>
            <div className={cN('listpage', styles.listpage)}>
                <span className={cN(styles.close)} onClick={()=>setListOpen(false)}>叉叉</span>
                {ListBlock()}
                <div>
                    <span>IG</span>
                    <span>FB</span>
                </div>
                <div>會員登入</div>
            </div>
            <div className={cN({[styles.background]:listOpen})} onClick={()=>setListOpen(false)}> </div>
        </>
    )
}

export default memo(Header);