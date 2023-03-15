import React, { memo, ReactNode, useEffect } from "react";
import styles from './styles.module.scss';
import cN from 'classnames';
import styled from "styled-components";

export enum E_direction {
    TOP = 'TOP',
    LEFT = 'LEFT',
    BOTTOM = 'BOTTOM',
    RIGHT = 'RIGHT',
}

type I_props = {
    isOpen: boolean;
    handleDispatch: Function;
    children: ReactNode;
    direction: E_direction;
    theName: string;
}

function LightBox ({isOpen, handleDispatch, children, direction, theName}: I_props) {
    const { body } = document;

    useEffect (()=>{
        const parent = document.querySelector(`.blocker .${theName}`) as HTMLElement;
        const blocker = parent.parentNode as HTMLElement;
        if(isOpen) {
            blocker?.setAttribute('style', 'display: block');
            body.classList.add(styles.lockpage);
            setTimeout(()=>{
                blocker?.classList.add(styles.show);
            },50)
        }else{
            blocker?.classList.remove(styles.show);
            setTimeout(()=>{
                body.classList.remove(styles.lockpage);
                blocker?.removeAttribute('style');
            },500)
        }
    },[body.classList, isOpen, theName])

    return (
        <>
            <div className={cN([styles.blocker], 'blocker', styles[direction])}>
                <span className={cN(styles.close)} onClick={()=>handleDispatch(false)}>叉叉</span>
                {children}
            </div>
            <div className={cN({[styles.background]:isOpen})} onClick={()=>handleDispatch(false)}> </div>
        </>
    )
}

export default memo(LightBox);