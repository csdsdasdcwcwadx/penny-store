import React, { memo } from "react";
import { I_orderinfo } from '@Redux/Order/interfaces';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@Redux/Order/store';
import { set_opendetail } from '@Redux/Order/actions';


interface I_props1 {
    orders: Array<I_orderinfo>;
}

const handleDate = (date: string) => {
    return date.split('T')[0];
}

const handlePayment = (payment: number) => {
    return payment === 1 ? '已付款' : '尚未付款';
}

function OrderList({orders}: I_props1) {
    const dispatch = useDispatch();
    const { openDetail } = useSelector((store: RootState)=>store);

    return (
        <div className={styles.orderlist}>
            <div>
                <div>訂單編號 : {orders[0].o_dentical}</div>
                <div>訂單日期 : {handleDate(orders[0].o_date)}</div>
                <div>付款狀態 : {handlePayment(orders[0].o_payment)}</div>
                {
                    openDetail === orders[0].o_dentical && orders.map((order) => {
                        return <div key={order.o_id}>
                            <Order order={order}/>
                        </div>
                    })
                }
            </div>
            <a onClick={()=>dispatch(set_opendetail(orders[0].o_dentical))} className={styles.checkout}>查看訂單明細</a>
        </div>
    )
}

interface I_props2 {
    order: I_orderinfo;
}

function Order({order}: I_props2) {
    return (
        <div className={styles.order}>
            {order.o_id}
        </div>
    )
}

export default memo(OrderList);