import React from "react";
import styles from './styles.module.scss';
import { setPage } from '@Redux/App/actions';
import { useDispatch, useSelector } from 'react-redux';
import { E_Page } from '@Redux/App/interfaces';
import { RootState } from '@Redux/App/store';

export default function Navigator() {
    const dispatch = useDispatch();
    const { listOpen } = useSelector((store: RootState)=>store);

    return (
        <div className={styles.Navigator}>
            <ul>
                <li onClick={()=>dispatch(setPage(E_Page.HOME))}>Home</li>
                <li onClick={()=>dispatch(setPage(E_Page.SHOPALL))}>全部商品 | SHOP ALL</li>
                <li onClick={()=>dispatch(setPage(E_Page.SALE))}>優惠專區 | SALE</li>
                <li onClick={()=>dispatch(setPage(E_Page.RESTOCK))}>熱騰騰現貨 | RESTOCK</li>
                <li onClick={()=>dispatch(setPage(E_Page.WEAR))}>穿搭筆記本 | WEAR</li>
                <li onClick={()=>dispatch(setPage(E_Page.MORE))}>更多</li>
            </ul>
        </div>
    )
}