import React, { memo, useEffect, useState } from "react";
import styles from './styles.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { call_listshipping } from '@Redux/Order/actions';
import { RootState } from '@Redux/Order/store';
import OrderList from "./OrderList";
import PageNumber from "@components/Common/PageNumber";
import { handlepath } from '@utils/domainByEnv';
import Spinner from "@components/Common/Modules/Spinner";
import axios from "axios";

axios.defaults.withCredentials = true;

function Body () {
    const [ serial, setSerial ] = useState(1);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { ordershipping, isLoading } = useSelector((store: RootState)=>store);

    useEffect(() => {
        PubSub.subscribe('isLogin', ()=>{
            setIsLogin(true);
        })
    },[])

    useEffect(() =>{
        const google = JSON.parse(localStorage.getItem('credentials')!);
        if(!google && !isLogin) {
            alert('會員尚未登入');
            window.location.href = `${handlepath()}`;
        }
        dispatch(call_listshipping({pages: serial}));
    },[dispatch, serial, isLogin])

    return (
        <div className={styles.paymentSuccess}>
            {
                isLoading ? <Spinner/> : <div>
                {
                    ordershipping?.orderinfo.map((orders, ind) => {
                        return <OrderList key={ind} orders={orders}/>
                    })
                }
                <PageNumber serial={serial} setSerial={setSerial} maxpage={ordershipping?.pages || 0}/>
            </div>
            }
        </div>
    )
}

export default memo(Body);