import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@Redux/App/store';
import './index.scss';
import { Header, Body, Navigator, Footer } from '@components/App/index';
import { setPage, setListOpen } from '@Redux/App/actions';
import { E_Page } from '@Redux/App/interfaces';

function BusSeatReservation() {
    const { listOpen } = useSelector((store: RootState)=>store);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(listOpen) {
            const listpage = document.querySelector('.listpage');
            listpage?.setAttribute('style', 'display: block');
            document.body.classList.add('setpage');
            setTimeout(()=>{
                listpage?.classList.add('show');
            },50)
        }
        if(!listOpen) {
            const listpage = document.querySelector('.listpage');
            listpage?.classList.remove('show');
            setTimeout(()=>{
                document.body.classList.remove('setpage');
                listpage?.removeAttribute('style');
            },500)
        }
    },[listOpen])

    return (
        <>
            <div className='pages' onClick={()=>listOpen && dispatch(setListOpen(false))}>
                <div className='topper'>
                    <Header/>
                    <Navigator/>
                    <Body/>
                </div>
                <Footer/>
            </div>
            <div className='listpage'>
                <span className='close' onClick={()=>dispatch(setListOpen(false))}>叉叉</span>
                <ul>
                    <li onClick={()=>dispatch(setPage(E_Page.HOME))}>Home</li>
                    <li onClick={()=>dispatch(setPage(E_Page.SHOPALL))}>全部商品 | SHOP ALL</li>
                    <li onClick={()=>dispatch(setPage(E_Page.SALE))}>優惠專區 | SALE</li>
                    <li onClick={()=>dispatch(setPage(E_Page.RESTOCK))}>熱騰騰現貨 | RESTOCK</li>
                    <li onClick={()=>dispatch(setPage(E_Page.WEAR))}>穿搭筆記本 | WEAR</li>
                    <li onClick={()=>dispatch(setPage(E_Page.MORE))}>更多</li>
                </ul>
                <div>
                    <span>IG</span>
                    <span>FB</span>
                </div>
                <div>會員登入</div>
            </div>
        </>
    );
}

export default BusSeatReservation;
