import React, { memo, useState, useEffect } from "react";
import styles from './styles.module.scss';
import { useDispatch } from "react-redux";
import { setPage } from '@Redux/App/actions';
import { E_Page } from '@Redux/App/interfaces';
import { handleNavigator } from '@utils/commonfunction';
import cN from 'classnames';

function Header() {
    const [listOpen, setListOpen] = useState<boolean>(false);
    const isMenu = !!document.getElementById('menu');
    const dispatch = useDispatch();
    const ListBlock = ()=>{
        return (
            <ul>
                {
                    Object.entries<E_Page>(E_Page).map(([key, value], ind) => {
                        return <li key={ind} onClick={() => {
                            setListOpen(false);
                            // 若不是首頁，就將上面的Navigator改成網址。
                            if(!isMenu) window.location.href = `/penny-store?page_id=${value}`;
                            else dispatch(setPage(E_Page[key as keyof typeof E_Page]));
                        }}>{handleNavigator(value)}</li>
                    })
                }
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
                <a className={styles.logo} href='/penny-store?page_id='>
                    PENNY_SHOP
                </a>
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