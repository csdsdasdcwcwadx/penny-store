import React, { useState, useEffect, memo, forwardRef } from 'react';
import styles from './styles.module.scss';
import cN from 'classnames';

export enum E_RegexType {
    PHONE = 'PHONE',
    NAME = 'NAME',
    ADDRESS = 'ADDRESS',
    EMAIL = 'EMAIL',
}

interface I_props {
    title: string;
    placeholder: string;
    type: E_RegexType;
    value?: string | number;
}

function InputBar ({title, placeholder, type, value}: I_props, ref: React.ForwardedRef<HTMLInputElement>) {
    const [input, setInput] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string | undefined>();

    useEffect(() => {
        value && setInput(`${value}`);
    },[value])

    useEffect(() => {
        
        let flag = true;
        const RegexNumTypes = /^[0-9]*$/;
        const RegexChineseTypes = /^[^\u4e00-\u9fa5]+$/;
        const RegexPhoneNum = /^09\d{8}$/;
        const RegexDecimalPoint = /^(\d{0,4})(\.\d{1,2})?$/;
        const Regexmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch(type) {
            // 手機驗證，不為空、為數字、為手機格式
            case E_RegexType.PHONE:
                if(!RegexPhoneNum.test(input!)) {
                    flag = false;
                    setErrMsg('此欄位須為手機格式');
                }
                if(!RegexNumTypes.test(input!)) {
                    flag = false;
                    setErrMsg('此欄位須為數字');
                }
                if(input === '') {
                    flag = false;
                    setErrMsg('此欄位必填');
                }
                break;
            case E_RegexType.NAME:
            case E_RegexType.ADDRESS:
                if(input === '') {
                    flag = false;
                    setErrMsg('此欄位必填');
                }
                break;
            case E_RegexType.EMAIL:
                if(!Regexmail.test(input!)) {
                    flag = false;
                    setErrMsg('此欄位須為信箱格式');
                }
                if(input === '') {
                    flag = false;
                    setErrMsg('此欄位必填');
                }
                break;
            default:
                if(input === '') {
                    flag = false;
                    setErrMsg('此欄位必填');
                }
        }
        if(flag) setErrMsg(undefined);
    },[input, type])

    return (
        <div className={styles.inputblock}>
            <span>{title}</span>
            <input placeholder={placeholder} onChange={e=>setInput(e.target.value)} ref={ref} defaultValue={value}/>
            {errMsg && <span className={cN(styles.err, 'error')}>{errMsg}</span>}
        </div>
    );
}

export default memo(forwardRef(InputBar));