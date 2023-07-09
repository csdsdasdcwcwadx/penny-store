import React, { memo, useEffect, useState, useRef } from "react";
import styles from './styles.module.scss';
import domain, { handlepath } from '@utils/domainByEnv';
import LightBox, { E_direction } from "@components/Common/Modules/LightBox";
import InputBar, { E_RegexType } from "@components/Common/Modules/InputBar";
import cN from 'classnames';
import axios from "axios";
import { auth, GoogleProvider } from "@utils/firebase-auth";
import { User, deleteUser, UserCredential, reauthenticateWithCredential } from "firebase/auth";

const member = JSON.parse(localStorage.getItem('memberinfo')!);
const credentials: UserCredential = JSON.parse(localStorage.getItem('credentials')!);

function Body () {
    const [openLightBox_name, setOpenLightBox_name] = useState(false);
    const [openLightBox_phone, setOpenLightBox_phone] = useState(false);
    const [openLightBox_address, setOpenLightBox_address] = useState(false);
    const m_name = useRef<HTMLInputElement>(null);
    const m_phone = useRef<HTMLInputElement>(null);
    const m_address = useRef<HTMLInputElement>(null);
    const postcal = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!member && !credentials) {
            alert('會員尚未登入');
            window.location.href = `${handlepath()}`;
        } else document.title = member.memberinfo[0].m_name;
    },[])

    const handleClick = async () => {
        const error = document.getElementsByClassName('error');
        if(error.length === 0) {
            const obj = {
                m_name: m_name.current?.value,
                m_address: postcal.current?.value && m_address.current?.value && `${postcal.current?.value}|${m_address.current?.value}`,
                m_phone: m_phone.current?.value,
            }
            try {
                const { data } = await axios.post(`${domain()}/member/infoupdatemember`, obj);
                if(data.status) {
                    alert(data.message);
                    window.localStorage.setItem('memberinfo', JSON.stringify(data));
                    location.reload();
                }
            }catch(e) {
                console.error(e);
            }
        }else alert(error[0].textContent);
    }

    const deleteMember = async () => {
        if(confirm('確認要刪除此用戶 ? ')) {
            try {
                const { data } = await axios.post(`${domain()}/member/deletemember`);
                if(data.status) {
                    window.localStorage.removeItem('memberinfo');
                    window.localStorage.removeItem('credentials');
                    await deleteUser(credentials.user as User);
                }
                location.reload();
            }catch(e) {
                console.error(e);
            }
        }
    }

    return (
        <div className={styles.personal}>
            <h1>個人資料修改</h1>
            {
                member && credentials && <ul>
                    <li onClick={()=>setOpenLightBox_name(true)}>姓名 <div>{member.memberinfo[0].m_name}</div></li>
                    <li onClick={()=>setOpenLightBox_phone(true)}>電話<div>{member.memberinfo[0].m_phone}</div></li>
                    <li onClick={()=>setOpenLightBox_address(true)}>地址<div>{member.memberinfo[0].m_address.replace('|', '')}</div></li>
                    <button onClick={deleteMember}>刪除用戶</button>
                </ul>
            }
            <LightBox
                isOpen={openLightBox_name}
                handleDispatch={setOpenLightBox_name}
                theName={styles.updatename}
                direction={E_direction.TOP}
            >
                <div className={cN(styles.updateinfo, styles.updatename)}>
                    {openLightBox_name && <InputBar title="修改姓名" placeholder="請輸入" maxlength={10} type={E_RegexType.NAME} ref={m_name}/>}
                    <button onClick={handleClick}>確認修改</button>
                </div>  
            </LightBox>
            <LightBox
                isOpen={openLightBox_phone}
                handleDispatch={setOpenLightBox_phone}
                theName={styles.updatephone}
                direction={E_direction.TOP}
            >
                <div className={cN(styles.updateinfo, styles.updatephone)}>
                    {openLightBox_phone && <InputBar title="修改電話" placeholder="請輸入電話" maxlength={10} type={E_RegexType.PHONE} ref={m_phone}/>}
                    <button onClick={handleClick}>確認修改</button>
                </div>  
            </LightBox>
            <LightBox
                isOpen={openLightBox_address}
                handleDispatch={setOpenLightBox_address}
                theName={styles.updateaddress}
                direction={E_direction.TOP}
            >
                <div className={cN(styles.updateinfo, styles.updateaddress)}>
                    {openLightBox_address && <InputBar title='郵遞區號' placeholder='請輸入郵遞區號' type={E_RegexType.NUMBER} maxlength={5} ref={postcal}/>}
                    {openLightBox_address && <InputBar title="修改地址" placeholder="請輸入地址" maxlength={255} type={E_RegexType.ADDRESS} ref={m_address}/>}
                    <button onClick={handleClick}>確認修改</button>
                </div>  
            </LightBox>
        </div>
    )
}

export default memo(Body);