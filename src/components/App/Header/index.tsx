import React from "react";
import styles from './styles.module.scss';
import { setListOpen } from '@Redux/App/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@Redux/App/store';

export default function Header() {
    const dispatch = useDispatch();
    const { listOpen } = useSelector((store: RootState)=>store);
    return (
        <div className={styles.Header}>
            <div>
                <span className={styles.show} onClick={()=>dispatch(setListOpen(!listOpen))}>展開</span>
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
    )
}