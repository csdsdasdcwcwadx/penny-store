import React, { memo, useMemo, useState } from "react";
import { I_orderinfo } from '@Redux/Order/interfaces';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@Redux/Order/store';
import { set_opendetail } from '@Redux/Order/actions';
import cN from 'classnames';
import { handleIMG, handleShipment } from "@utils/commonfunction";
import '@components/Common/Modules/ic-ln/css.css';
import { handlePayment } from "@utils/commonfunction";
// import { SlideToggle } from '@todys/react-slide-toggle';

interface I_props1 {
    orders: Array<I_orderinfo>;
}

const handleDate = (date: string, isTime: boolean = false) => {
    const utcDateTime = date;
    const localDateTime = new Date(utcDateTime).toLocaleString('en-US', { timeZone: 'Asia/Taipei', hour12: false });
    if(isTime) return localDateTime.split(',')[1];
    return localDateTime.split(',')[0];
}

function OrderList({orders}: I_props1) {
    const dispatch = useDispatch();
    const { openDetail } = useSelector((store: RootState)=>store);
    let total = 0;
    const isActive = useMemo(() => {
        return openDetail === orders[0].o_dentical;
    },[openDetail, orders])

    return (
        <div className={cN(styles.orderlist, {[styles.isActive]: isActive})}>
            <div className={styles.adjustment}>
                <div className={styles.ordertitle}>
                    <div>
                        <div>訂單編號 : {orders[0].o_dentical}</div>
                        <div>訂單日期 : {handleDate(orders[0].o_date)}</div>
                        <div>訂單時間 : {handleDate(orders[0].o_date, true)}</div>
                        <div className={styles.status}>付款狀態 : {handlePayment(orders[0].o_payment)}</div>
                        <div className={styles.status}>出貨狀態 : {handleShipment(orders[0].isShip)}</div>
                    </div>
                    <a onClick={()=>dispatch(set_opendetail(orders[0].o_dentical))} className={styles.checkout}>
                        <span>查看訂單明細</span>
                        <i className="icon ic-ln planearrowoneway"/>
                    </a>
                </div>
                <div className={cN({[styles.isHide]: !isActive}, styles.ordercontent)}>
                    <div className={styles.ordernav}>
                        <nav>產品名稱</nav>
                        <nav>產品價格</nav>
                        <nav>購買數量</nav>
                        <nav>尺寸</nav>
                        <nav>小計</nav>
                    </div>
                    {
                        orders.map((order) => {
                            const dollar = order.o_price*order.o_amount;
                            total += dollar;
                            return <Order key={order.o_id} order={order} total={total}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

interface I_props2 {
    order: I_orderinfo;
    total: number;
}

function Order({order, total}: I_props2) {
    return (
        <>
            <div className={styles.orderitem}>
                <div className={styles.photo}>
                    <img src={handleIMG(order.o_img)}/>
                    <span>{order.op_name}</span>
                </div>
                <div data-title='產品價格'>
                    <span>{order.o_price}元</span>
                </div>
                <div data-title='購買數量'>
                    <span>{order.o_amount}</span>
                </div>
                <div data-title='尺寸'>
                    <span>{order.o_size}</span>
                </div>
                <div data-title='小計'>
                    <span>{order.o_price*order.o_amount}元</span>
                </div>
            </div>
            <div className={styles.ordersum}>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
                <div>共{total}元</div>
            </div>
        </>
    )
}

export default memo(OrderList);