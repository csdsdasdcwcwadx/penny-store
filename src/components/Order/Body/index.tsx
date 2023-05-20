import React, { memo, useEffect } from "react";
import styles from './styles.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { call_listshipping } from '@Redux/Order/actions';
import { RootState } from '@Redux/Order/store';
import OrderList from "./OrderList";

const paymentStatus = true;

function Body () {
    const dispatch = useDispatch();
    const { ordershipping } = useSelector((store: RootState)=>store);

    useEffect(() =>{
        const member = JSON.parse(localStorage.getItem('memberinfo')!);
        dispatch(call_listshipping({m_id: member.memberinfo[0].m_id}));
    },[dispatch])

    return (
        <div className={styles.paymentSuccess}>
            {
                ordershipping ? ordershipping.orderinfo.length > 0 ? ordershipping.orderinfo.map((orders, ind) => {
                    return <OrderList key={ind} orders={orders}/>
                }) : <div>尚無訂單資訊</div> : <div>尚未取得訂單資訊</div>
            }
        </div>
    )
}

export default memo(Body);