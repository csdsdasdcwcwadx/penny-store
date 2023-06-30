import React, { memo, useEffect, useState, useRef } from "react";
import styles from './styles.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { call_listshipping } from '@Redux/Backend/actions';
import { RootState } from '@Redux/Backend/store';
import PageNumber from '@components/Common/PageNumber';
import { handleIMG } from "@utils/commonfunction";
import { I_orderinfo } from "@Redux/Order/interfaces";
import cN from 'classnames';
import { handlePayment, handleDate, handleDistribution } from "@utils/commonfunction";
import domain from '@utils/domainByEnv';
import axios from "axios";
import '@components/Common/Modules/ic-ln/css.css';
import Spinner from "@components/Common/Modules/Spinner";

function Shipping() {
    const { orderdetail, isLoading } = useSelector((store: RootState)=>store);
    const dispatch = useDispatch();
    const [ serial, setSerial ] = useState(1);
    const [listunship, setListunship] = useState(0);
    const [keyword, setKeyword] = useState<string>();
    const searchWord = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(call_listshipping({pages: serial, frombackend: true, listunship, keyword}));
    },[dispatch, serial, listunship, keyword])

    const clearSearching = () => {
        setKeyword(undefined);
        if(searchWord.current) searchWord.current.value = '';
    }

    return (
        <div className={styles.Shipping}>
            <div className={styles.listshipping}>
                <button onClick={() => {clearSearching();setListunship(0);setSerial(1)}}>列出所有訂單</button>
                <button onClick={() => {clearSearching();setListunship(1);setSerial(1)}}>列出尚未出貨訂單</button>
            </div>
            <div className={styles.searchbox}>
                <input placeholder="關鍵字搜尋" type="text" ref={searchWord}/>
                <button onClick={()=>{setSerial(1);setKeyword(searchWord.current?.value)}}>
                    <i className="icon ic-ln toolsearch"/>
                </button>
            </div>
            <div className={styles.ordertable}>
                <div className={styles.ordernav}>
                    <nav className={styles.photo}>產品名稱</nav>
                    <nav>產品價格</nav>
                    <nav>購買數量</nav>
                    <nav>顏色</nav>
                    <nav>尺寸</nav>
                    <nav>小計</nav>
                </div>
            </div>
            {
                isLoading ? <Spinner/> :
                <div>
                    {
                        orderdetail?.orderinfo.map((orders, ind) => {
                            return <Orders key={ind} orders={orders} serial={serial}/>
                        })
                    }
                    {
                        orderdetail && <PageNumber serial={serial} setSerial={setSerial} maxpage={orderdetail.pages}/>
                    }
                </div>
            }
        </div>
    )
}

interface I_props {
    orders: Array<I_orderinfo>;
    serial: number;
}

function Orders ({orders, serial}: I_props) {
    let total = 0;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const changeShipment = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, o_dentical: string) => {
        event.stopPropagation();
        const body = {
            o_dentical,
        }
        try{
            const {data} = await axios.post(`${domain()}/order/changeshipment`, body);
            if(data.status) {
                dispatch(call_listshipping({pages: serial, frombackend: true}));
            }
            alert(data.message)
        }catch (e) {
            console.error(e);
        }
    }

    const changePayment = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, o_dentical: string) => {
        event.stopPropagation();
        const body = {
            o_dentical,
        }
        try{
            const {data} = await axios.post(`${domain()}/order/changepayment`, body);
            if(data.status) {
                dispatch(call_listshipping({pages: serial, frombackend: true}));
            }
            alert(data.message)
        }catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={cN(styles.orderdatatable, {[styles.isClosed]: !isOpen})}>
            <div className={styles.orderouter} onClick={() => setIsOpen(pre => !pre)}>
                <div>
                    <div>單號 : {orders[0].o_dentical}({handleDistribution(orders[0].o_distributed)})</div>
                    <div>是否付款 : {handlePayment(orders[0].o_payment)}</div>
                    <div>下單日期 : {handleDate(orders[0].o_date)}</div>
                    <div>下單時間 : {handleDate(orders[0].o_date, true)}</div>
                    {
                        orders[0].isShip ? <div className={styles.hasShip}><i className="icon ic-ln toolchoosen"/><span>訂單已出貨</span></div> : 
                        <button onClick={e => changeShipment(e, orders[0].o_dentical)}>訂單出貨</button>
                    }
                    {
                        orders[0].o_payment ? <div className={styles.hasPaid}><i className="icon ic-ln toolchoosen"/><span>訂單已付款</span></div> : 
                        <button onClick={e => changePayment(e, orders[0].o_dentical)}>訂單已付款</button>
                    }
                </div>
                <div>
                    <span><span>收件人姓名：</span><span>{orders[0].o_name}</span></span>
                    <span><span>收件人聯絡方式：</span><span>{orders[0].o_phone}</span></span>
                    <span><span>收件人地址：</span><span>{orders[0].o_address.replace('|', '')}</span></span>
                </div>
            </div>
            <div className={cN(styles.orders)}>
                {
                    orders.map((order) => {
                        const dollar = order.o_price*order.o_amount;
                        total += dollar;
                        return (
                            <div key={order.o_id} className={styles.order}>
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
                                <div data-title='顏色'>
                                    <span>{order.o_color}</span>
                                </div>
                                <div data-title='尺寸'>
                                    <span>{order.o_size}</span>
                                </div>
                                <div data-title='小計'>
                                    <span>{order.o_price*order.o_amount}元</span>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={cN(styles.order, styles.sum)}>
                    <div> </div>
                    <div> </div>
                    <div> </div>
                    <div> </div>
                    <div> </div>
                    <div>共{total}元</div>
                </div>
            </div>
        </div>

    )
}

export default memo(Shipping);