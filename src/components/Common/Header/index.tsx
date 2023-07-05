import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import styles from './styles.module.scss';
import { useDispatch } from "react-redux";
import { setPage } from '@Redux/App/actions';
import { E_Page } from '@Redux/App/interfaces';
import { handleNavigator } from '@utils/commonfunction';
import LightBox, { E_direction } from "../Modules/LightBox";
import '../Modules/ic-ln/css.css';
import { auth, GoogleProvider, FacebookProvider, E_auth } from '@utils/firebase-auth';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import cN from 'classnames';
import InputBar, { E_RegexType } from "../Modules/InputBar";
import axios from "axios";
import domain, { handlepath } from '@utils/domainByEnv';
import PubSub from 'pubsub-js';
import googleImg from '../../../imgs/google.svg';
import facebookImg from '../../../imgs/facebook.png';
import LOGO from '../../../imgs/IMG_2932.png';

function storageAvailable(type: any) {
    let storage: any;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
}

function Header() {
    const [listOpen, setListOpen] = useState<boolean>(false);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    // const [memberinfo, setMemberinfo] = useState<I_member | undefined>();
    const [credentials, setCredentials] = useState<UserCredential | null>();
    const isMenu: boolean = !!document.getElementById('menu');
    const isLocal = window.location.href.includes('localhost');
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;

    PubSub.subscribe('openLogin', () => {
        setLoginOpen(true);
    })

    // 登出
    const handlelogout = async () => {
        localStorage.removeItem('credentials');
        localStorage.removeItem('memberinfo');
        await axios.get(`${domain()}/member/logout`);
        location.reload();
    }

    // 前往結賬
    const handlepayment = () => {
        window.location.href = `${handlepath()}/payment${isLocal?'.html':''}`;
    }

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
    
    // 使用者列表區塊
    const userBlock = () => {
        return (
            <>
                <li>修改個人資料</li>
                <li onClick={()=>{window.location.href = `${handlepath()}/order${isLocal?'.html':''}`}}>查看歷史訂單</li>
                <li onClick={()=>handlepayment()}>前往結賬</li>
            </>
        )
    }

    // 處理登入資訊
    useEffect(()=>{
        (async function() {
            try{
                // 若有credentials 代表剛註冊完成
                const memberinfo = JSON.parse(localStorage.getItem('memberinfo')!);
                const credentials = JSON.parse(localStorage.getItem('credentials')!);
                const obj = {
                    m_email: memberinfo?.memberinfo[0].m_email || null,
                    hasLogin: Boolean(localStorage.getItem('memberinfo') && localStorage.getItem('credentials')),
                }
                try{
                    const { data } = await axios.post(`${domain()}/member/loginmember`, obj);
                    // 正確取得資訊後就不需要再做登入
                    if(data.status) {
                        PubSub.publish('isLogin', data.status);
                        setCredentials(credentials);
                    } else {
                        if(obj.m_email) {
                            localStorage.removeItem('memberinfo');
                            localStorage.removeItem('credentials');
                            setCredentials(null);
                            alert(data.message);
                        }
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
                    <span className={cN(styles.show, styles.toolmenu)} onClick={()=>setListOpen(true)}>
                        <i className="icon ic-ln toolmenu"/>
                    </span>
                    {/* <a><i className={cN('icon ic-ln toolfroundf', styles.facebook)}/></a> */}
                    <a href="https://www.instagram.com/londoner.tw/"><img className={styles.instagram} src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png"/></a>
                </div>
                    <span 
                        className={styles.logo}
                        onClick={async () => {
                            try {
                                const { data } = await axios.post(`${domain()}/member/isavailable`, {isLocal});
                                window.location.href = `${handlepath()}${data.url}`;
                            }catch(e) {
                                console.error(e);
                            }
                        }}
                    ><img src={LOGO}/></span>
                <div>
                    {
                        credentials ?
                        <span className={styles.displaymember}>
                            <img src={credentials.user.photoURL!}/>
                            <span>{credentials.user.displayName} 您好!!</span>
                            <div className={styles.memberoptions}>
                                <ul>
                                    {userBlock()}
                                    <li onClick={handlelogout}>登出</li>
                                </ul>
                            </div>
                        </span>:
                        <span onClick={()=>setLoginOpen(true)}>會員登入</span>
                    }
                    {/* <span>
                        <i className="icon ic-ln toolsearch"/>
                    </span> */}
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
                                <div>
                                    <img src={credentials.user.photoURL!}/>
                                    <span>{credentials.user.displayName} 您好!!</span>
                                </div>
                                <button className={styles.logout} onClick={handlelogout}>登出</button>
                            </span>
                            <div>
                                <ul>
                                    {userBlock()}
                                </ul>
                            </div>
                        </span>:
                        <span className={styles.loginbut} onClick={()=>{setListOpen(false);setLoginOpen(true)}}>會員登入</span>
                    }
                    <div className={styles.display}>商品分類</div>
                    {ListBlock()}
                    <div className={styles.otheroptions}>
                        <a href="https://www.instagram.com/londoner.tw/"><img className={styles.instagram} src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhB.png"/></a>
                    </div>
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
    const postcal = useRef<HTMLInputElement>(null);

    const handleRegistry = useCallback( async (authen: E_auth) => {
        const error = document.getElementsByClassName('error');
        if(error.length === 0) {
            try {
                const auther = await signInWithPopup(auth, authen === E_auth.google ? GoogleProvider : FacebookProvider);
                const obj = {
                    m_name: m_name.current?.value,
                    m_address: `${postcal.current?.value}|${m_address.current?.value}`,
                    m_phone: m_phone.current?.value,
                    m_email: auther.user.email,
                    apitype: authen,
                }
                try{
                    const { data } = await axios.post(`${domain()}/member/registrymember`, obj);
                    alert(data.message);
                    if(data.status) {
                        localStorage.setItem('credentials', JSON.stringify(auther));
                        localStorage.setItem('memberinfo', JSON.stringify(data));
                        location.reload();
                    }
                }catch(e) {
                    console.error('error => ', e);
                }
            }catch(err) {
                console.error('error => ', err);
            }
        }else alert(error[0].textContent);
    },[m_name, m_phone, m_address])

    const handleLogin = async (authen: E_auth) => {
        try {
            const loginAPI = await signInWithPopup(auth, authen === E_auth.google ? GoogleProvider : FacebookProvider);
            const obj = {
                m_email: loginAPI?.user.email,
                hasLogin: false,
                apitype: authen,
            }
            const { data } = await axios.post(`${domain()}/member/loginmember`, obj);
            // 登入成功就將資料寫入localStorage
            if(data.status) {
                localStorage.setItem('memberinfo', JSON.stringify(data));
                localStorage.setItem('credentials', JSON.stringify(loginAPI));
                location.reload();
            } else alert(data.message);
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
                                        <button onClick={()=>handleLogin(E_auth.google)}>
                                            <img src={googleImg}/>
                                            <span>使用Google登入</span>
                                        </button>
                                        <button onClick={()=>handleLogin(E_auth.facebook)}>
                                            <img src={facebookImg}/>
                                            <span>使用FaceBook登入</span>
                                        </button>
                                    </div>
                                </div> : 
                                <div>
                                    <div className={styles.title}>會員註冊</div>
                                    <InputBar title='姓名' placeholder='請輸入姓名' type={E_RegexType.NAME} ref={m_name} maxlength={10}/>
                                    <InputBar title='手機' placeholder='請輸入手機' type={E_RegexType.PHONE} ref={m_phone} maxlength={20}/>
                                    <div className={styles.address}>
                                        <InputBar title='郵遞區號' placeholder='請輸入郵遞區號' type={E_RegexType.NUMBER} ref={postcal} maxlength={5}/>
                                        <InputBar title='地址' placeholder='請輸入地址' type={E_RegexType.ADDRESS} ref={m_address} maxlength={255}/>
                                    </div>
                                    <div className={styles.buttonlist}>
                                        <button onClick={()=>handleRegistry(E_auth.google)}>
                                            <img src={googleImg}/>
                                            <span>使用Google註冊</span>
                                        </button>
                                        <button onClick={()=>handleRegistry(E_auth.facebook)}>
                                            <img src={facebookImg}/>
                                            <span>使用FaceBook註冊</span>
                                        </button>
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