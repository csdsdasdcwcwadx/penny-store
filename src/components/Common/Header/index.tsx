import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import styles from './styles.module.scss';
import { useDispatch } from "react-redux";
import { setPage } from '@Redux/App/actions';
import { E_Page } from '@Redux/App/interfaces';
import { handleNavigator } from '@utils/commonfunction';
import LightBox, { E_direction } from "../Modules/LightBox";
import '../Modules/ic-ln/css.css';
import { auth, GoogleProvider, MailProvider } from '@utils/firebase-auth';
import { signInWithRedirect, getRedirectResult, signInWithPopup, UserCredential, signInWithEmailLink } from 'firebase/auth';
import cN from 'classnames';
import InputBar, { E_RegexType } from "../Modules/InputBar";
import axios from "axios";
import domain, { handlepath } from '@utils/domainByEnv';
import PubSub from 'pubsub-js';
import { I_member } from "@Redux/App/interfaces";

function Header() {
    const [listOpen, setListOpen] = useState<boolean>(false);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [memberinfo, setMemberinfo] = useState<I_member | undefined>();
    const [credentials, setCredentials] = useState<UserCredential | null>();
    const isMenu: boolean = !!document.getElementById('menu');
    const isLocal = window.location.href.includes('localhost');
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
                            if(!isMenu) window.location.href = `${handlepath()}?page_id=${value}`;
                            else dispatch(setPage(E_Page[key as keyof typeof E_Page]));
                        }}>{handleNavigator(value)}</li>
                    })
                }
            </ul>
        )
    }

    // 登出區塊
    const handlelogout = async () => {
        localStorage.removeItem('credentials');
        localStorage.removeItem('memberinfo');
        await axios.get(`${domain()}/member/logout`);
        location.reload();
    }

    // 處理登入資訊
    useEffect(()=>{
        (async function() {
            try{
                // 若有credentials 代表剛註冊完成
                const credentials = JSON.parse(localStorage.getItem('credentials')!)
                const loginAPI = await getRedirectResult(auth) || credentials;
                const obj = {
                    m_email: loginAPI?.user.email,
                }
                try{
                    const { data } = await axios.post(`${domain()}/member/loginmember`, obj);
                    // 若傳入的email不為空，並且登入失敗，則跳出alert。
                    if(!data.status && obj.m_email) alert(data.message);
                    // 若回傳結果為true，則將memberinfo寫進去localStorage
                    if(data.status) {
                        localStorage.setItem('memberinfo', JSON.stringify(data));
                        setMemberinfo(data);
                        PubSub.publish('isLogin', data);
                        // google登入完後寫進去狀態
                        if(loginAPI) {
                            localStorage.setItem('credentials', JSON.stringify(loginAPI));
                            setCredentials(loginAPI);
                        }
                    }
                    // 若當前localStorage有credentials，則將此設為狀態。
                    if(credentials) setCredentials(credentials);
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
                    <a href="https://www.instagram.com/zllondoner.tw/?igshid=YmMyMTA2M2Y%3D"><img className={styles.instagram} src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png"/></a>
                </div>
                    <a 
                        className={styles.logo} 
                        href={memberinfo && memberinfo.memberinfo[0].isAdmin === 0 ?`${handlepath()}?page_id=`:`${handlepath()}/backend${isLocal?'.html':''}`}
                    >LONDONER</a>
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
                direction={E_direction.LEFT}
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
                        <span className={styles.loginbut} onClick={()=>{setListOpen(false);setLoginOpen(true)}}>會員登入</span>
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
                    const { data } = await axios.post(`${domain()}/member/registrymember`, obj);
                    alert(data.message);
                    if(data.status) {
                        localStorage.setItem('credentials', JSON.stringify(google));
                        location.reload();
                    }
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
                                    <InputBar title='姓名' placeholder='請輸入姓名' type={E_RegexType.NAME} ref={m_name}/>
                                    <InputBar title='手機' placeholder='請輸入手機' type={E_RegexType.PHONE} ref={m_phone}/>
                                    <InputBar title='地址' placeholder='請輸入地址' type={E_RegexType.ADDRESS} ref={m_address}/>
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