import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import styles from './styles.module.scss';
import { useDispatch } from "react-redux";
import { setPage } from '@Redux/App/actions';
import { E_Page } from '@Redux/App/interfaces';
import { handleNavigator } from '@utils/commonfunction';
import LightBox, { E_direction } from "../Modules/LightBox";
import '../Modules/ic-ln/css.css';
import { auth, GoogleProvider } from '@utils/firebase-auth';
import { signInWithRedirect, getRedirectResult, signInWithPopup, UserCredential } from 'firebase/auth';
import cN from 'classnames';
import InputBar from "../Modules/InputBar";
import axios from "axios";

function Header() {
    const [listOpen, setListOpen] = useState<boolean>(false);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<UserCredential | null>();
    const isMenu: boolean = !!document.getElementById('menu');
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;
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

    const handlelogout = async () => {
        localStorage.removeItem('credentials');
        localStorage.removeItem('memberinfo');
        await axios.get('/local/member/logout');
        location.reload();
    }

    useEffect(()=>{
        (async function() {
            try{
                const loginAPI = await getRedirectResult(auth);
                const obj = {
                    m_email: loginAPI?.user.email,
                }
                try{
                    const { data } = await axios.post('/local/member/loginmember', obj);
                    // 若傳入的email不為空，並且登入失敗，則跳出alert。
                    if(!data.status && obj.m_email) alert(data.message);
                    // 若回傳結果為true，則將memberinfo寫進去localStorage
                    if(data.status) localStorage.setItem('memberinfo', JSON.stringify(data));
                    // google登入完後寫進去狀態
                    if (loginAPI) {
                        localStorage.setItem('credentials', JSON.stringify(loginAPI));
                        setCredentials(loginAPI);
                    }
                    // 若當前localStorage有credentials，則將此設為狀態。
                    if(localStorage.getItem('credentials')) {
                        setCredentials(JSON.parse(localStorage.getItem('credentials')!));
                    }
                }catch(err) {
                    console.error('error => ', err);
                }
            }catch (e) {
                console.error('error => ', e);
            }
        })()
    },[])

    return (
        <>
            <div className={styles.Header}>
                <div>
                    <span className={styles.show} onClick={()=>setListOpen(true)}>展開</span>
                    <a><i className={cN('icon ic-ln toolfroundf', styles.facebook)}/></a>
                    <a><img className={styles.instagram} src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png"/></a>
                </div>
                <a className={styles.logo} href='/penny-store?page_id='>PENNY_SHOP</a>
                <div>
                    <span className={styles.show}>seh</span>
                    {
                        credentials ?
                        <span className={styles.displaymember}>
                            <img src={credentials.user.photoURL!}/>
                            <span>{credentials.user.displayName} 您好!!</span>
                            <div className={styles.memberoptions}>
                                <ul>
                                    <li>查看歷史訂單</li>
                                    <li>查看歷史訂單</li>
                                    <li>查看歷史訂單</li>
                                    <li>查看歷史訂單</li>
                                    <li onClick={handlelogout}>登出</li>
                                </ul>
                            </div>
                        </span>:
                        <span onClick={()=>setLoginOpen(true)}>會員登入</span>
                    }
                    <span>
                        <i className="icon ic-ln toolsearch"/>
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
                    {
                        credentials ?
                        <span className={styles.displaymember}>
                            <span className={styles.memberinfo}>
                                <img src={credentials.user.photoURL!}/>
                                <span>{credentials.user.displayName} 您好!!</span>
                            </span>
                            <div>
                                <ul>
                                    <li>查看歷史訂單</li>
                                    <li>查看歷史訂單</li>
                                    <li>查看歷史訂單</li>
                                    <li>查看歷史訂單</li>
                                </ul>
                            </div>
                        </span>:
                        <span onClick={()=>{setListOpen(false);setLoginOpen(true)}}>會員登入</span>
                    }
                    {ListBlock()}
                    <div className={styles.otheroptions}>
                        <a><i className={cN('icon ic-ln toolfroundf', styles.facebook)}/></a>
                        <a><img className={styles.instagram} src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png"/></a>
                    </div>
                    {credentials && <button className={styles.logout} onClick={handlelogout}>登出</button>}
                </div>
            </LightBox>
            {LoginandRegister(loginOpen, setLoginOpen)}
        </>
    )
}

function LoginandRegister (loginOpen: boolean, setLoginOpen: Function) {
    const [memberEvent, setMemberEvent] = useState<string>('login');
    const m_name = useRef<HTMLInputElement>(null);
    const m_phone = useRef<HTMLInputElement>(null);
    const m_address = useRef<HTMLInputElement>(null);

    const handleRegistry = useCallback( async () => {
        if(document.getElementsByClassName('error').length === 0) {
            try {
                const google = await signInWithPopup(auth, GoogleProvider);
                const obj = {
                    m_name: m_name.current?.value,
                    m_address: m_address.current?.value,
                    m_phone: m_phone.current?.value,
                    m_email: google.user.email,
                }
                try{
                    const { data } = await axios.post('/local/member/registrymember', obj);
                    alert(data.message);
                    if(data.status) location.reload();
                }catch(e) {
                    console.error('error => ', e);
                }
            }catch(err) {
                console.error('error => ', err);
            }
        }
    },[m_name, m_phone, m_address])

    const handleLogin = async () => {
        try {
            await signInWithRedirect(auth, GoogleProvider);
        }catch(e) {
            console.error('error => ', e);
        }
    }

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
                                    <div className={styles.buttonlist}>
                                        <button onClick={handleLogin}>登入</button>
                                    </div>
                                </div> : 
                                <div>
                                    <div className={styles.title}>會員註冊</div>
                                    <InputBar title='姓名' placeholder='請輸入姓名' type='name' ref={m_name}/>
                                    <InputBar title='手機' placeholder='請輸入手機' type='phone' ref={m_phone}/>
                                    <InputBar title='地址' placeholder='請輸入地址' type='address' ref={m_address}/>
                                    <div className={styles.buttonlist}>
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

export default memo(Header);