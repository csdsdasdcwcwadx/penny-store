import React, { memo, useEffect, useState } from "react";
import styles from './styles.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { call_listshipping } from '@Redux/Order/actions';
import { RootState } from '@Redux/Order/store';
import OrderList from "./OrderList";
import PageNumber from "@components/Common/PageNumber";
import { handlepath } from '@utils/domainByEnv';
import Spinner from "@components/Common/Modules/Spinner";

function Body () {
    const [ serial, setSerial ] = useState(1);
    const dispatch = useDispatch();
    const { ordershipping, isLoading } = useSelector((store: RootState)=>store);

    useEffect(() =>{
        const member = JSON.parse(localStorage.getItem('memberinfo')!);
        const google = JSON.parse(localStorage.getItem('credentials')!);
        if(!member && !google) {
            alert('會員尚未登入');
            window.location.href = `${handlepath()}`;
        }
        dispatch(call_listshipping({m_id: member.memberinfo[0].m_id, pages: serial}));
    },[dispatch, serial])

    return (
        <div className={styles.paymentSuccess}>
            {
                ordershipping ? ordershipping.orderinfo.length > 0 ? 
                <div>
                    {
                        ordershipping.orderinfo.map((orders, ind) => {
                            return <OrderList key={ind} orders={orders}/>
                        })
                    }
                    <PageNumber serial={serial} setSerial={setSerial} maxpage={ordershipping.pages}/>
                </div> : <div>尚無訂單資訊</div> : <Spinner/>
            }
        </div>
    )
}

export default memo(Body);