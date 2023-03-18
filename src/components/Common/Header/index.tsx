import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import styles from './styles.module.scss';
import { useDispatch } from "react-redux";
import { setPage } from '@Redux/App/actions';
import { E_Page } from '@Redux/Common/interfaces';
import { handleNavigator } from '@utils/commonfunction';
import LightBox, { E_direction } from "../Modules/LightBox";
import '../Modules/ic-ln/css.css';
import google from '../../../imgs/google.jpg';
import { auth, GoogleProvider } from '@utils/firebase-auth';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import cN from 'classnames';

function Header() {
    const [listOpen, setListOpen] = useState<boolean>(false);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
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
        (async function() {
            try{
                const credentials = await getRedirectResult(auth);
                console.log("@@@", credentials)
            }catch (e) {
                console.error('error => ', e)
            }
        })()
    },[])

    return (
        <>
            <div className={styles.Header}>
                <div>
                    <span className={styles.show} onClick={()=>setListOpen(true)}>展開</span>
                    <span>fb</span>
                    <span>IG</span>
                </div>
                <a className={styles.logo} href='/penny-store?page_id='>PENNY_SHOP</a>
                <div>
                    <span className={styles.show}>seh</span>
                    <span onClick={()=>setLoginOpen(true)}>會員登入</span>
                    <span>
                        <i className="icon ic-ln toolsearch" />
                    </span>
                </div>
            </div>
            <div className={styles.Navigator}>
                {ListBlock()}
            </div>
            <LightBox 
                isOpen={listOpen} 
                handleDispatch={setListOpen}
                direction={'LEFT' as E_direction}
                theName={styles.block}
            >
                <div className={styles.block}>
                    {ListBlock()}
                    <div>
                        <span>IG</span>
                        <span>FB</span>
                    </div>
                    <div onClick={()=>{setLoginOpen(true);setListOpen(false);}}>會員登入</div>
                </div>
            </LightBox>
            {LoginandRegister(loginOpen, setLoginOpen)}
        </>
    )
}

function LoginandRegister (loginOpen: boolean, setLoginOpen: Function) {
    const [memberEvent, setMemberEvent] = useState<string>('login');
    const m_name = useRef<HTMLInputElement>(null);
    const m_email = useRef<HTMLInputElement>(null);
    const m_phone = useRef<HTMLInputElement>(null);
    const m_address = useRef<HTMLInputElement>(null);
    const barList = [
        {
            name: '姓名',
            placeholder: '請輸入姓名',
        },
        {
            name: '信箱',
            placeholder: '請輸入信箱',
        },
        {
            name: '手機',
            placeholder: '請輸入手機',
        },
        {
            name: '地址',
            placeholder: '請輸入地址',
        }
    ]

    const handleRegistry = useCallback(() => {
        const obj = {
            m_name: m_name.current?.value,
            m_email: m_email.current?.value,
            m_address: m_address.current?.value,
            m_phone: m_phone.current?.value,
        }
        console.log("@@@", obj)
    },[m_name, m_phone, m_email, m_address])

    return (
        <div className={styles.logincontainer}>
            <LightBox
                isOpen={loginOpen}
                handleDispatch={setLoginOpen}
                direction={'TOP' as E_direction}
                theName={styles.membereventblock}
            >
                <div className={styles.membereventblock}>
                    <div className={styles.memberevent}>
                        <div className={styles.buttons}>
                            <button onClick={()=>setMemberEvent('login')} className={cN({[styles.active]: memberEvent === 'login'})}>會員登入</button>
                            <button onClick={()=>setMemberEvent('register')} className={cN({[styles.active]: memberEvent === 'register'})}>會員註冊</button>
                        </div>
                        {
                            memberEvent === 'login' ? 
                                <div>
                                    <div className={styles.title}>會員登入</div>
                                </div> : 
                                <div>
                                    <div className={styles.title}>會員註冊</div>
                                    <div className={styles.inputblock}>
                                        <span>姓名</span>
                                        <input placeholder="請輸入姓名" ref={m_name}/>
                                        <span className={styles.err}>錯誤訊息</span>
                                    </div>
                                    <div className={styles.inputblock}>
                                        <span>信箱</span>
                                        <input placeholder="請輸入信箱" ref={m_email}/>
                                        <span className={styles.err}>錯誤訊息</span>
                                    </div>
                                    <div className={styles.inputblock}>
                                        <span>手機</span>
                                        <input placeholder="請輸入手機" ref={m_phone}/>
                                        <span className={styles.err}>錯誤訊息</span>
                                    </div>
                                    <div className={styles.inputblock}>
                                        <span>地址</span>
                                        <input placeholder="請輸入地址" ref={m_address}/>
                                        <span className={styles.err}>錯誤訊息</span>
                                    </div>
                                    <div className={styles.buttonlist}>
                                        <button>重設</button>
                                        <button onClick={handleRegistry}>送出</button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </LightBox>
        </div>
    )
}

function InputBar () {
    return (    
        <div>
            111
        </div>
    )
}

export default memo(Header);