import React, { memo, useEffect } from 'react';
import styles from './styles.module.scss';
import BreadCrumb from '../../Common/Modules/BreadCrumb';
import Item from '@components/App/Item';
import { RootState } from '@Redux/App/store';
import { useSelector, useDispatch } from 'react-redux';
import { call_getallproduct } from '@Redux/App/actions';
import { I_productinfo } from '@Redux/App/interfaces';
import Spinner from '@components/Common/Modules/Spinner';
import { handleNavigator } from '@utils/commonfunction';

function Body() {
    const { page, getallproduct, isLoading } = useSelector((store: RootState)=>store); 
    const dispatch = useDispatch();

    useEffect(() => {
        const url = new URL (window.location.href);
        const page_id = url.searchParams.get('page_id');
        if(page_id === '' || page_id) {
            window.history.pushState({}, '', window.location.href.split('?')[0]);
            dispatch(call_getallproduct({p_type: page_id}));
        }else{
            dispatch(call_getallproduct({p_type: page}));
        }

    },[dispatch, page])

    const handleBreadCrumb = () => {
        const menu = {name: '首頁', href: '/penny-store?page_id='}
        return [menu, {name: handleNavigator(page), href: ''}];
    }

    return (
        isLoading ? <Spinner/> :
            <div className={styles.Body}>
                <div className={styles.title}>{getallproduct && handleNavigator(page)}</div>
                <button onClick={()=>{
                    const member = JSON.parse(localStorage.getItem('memberinfo')!);
                    const google = JSON.parse(localStorage.getItem('credentials')!);
                    console.log("@@@", member)
                    console.log("@@@", google)
                }}>查看登錄狀態</button>
                <div className={styles.breadcrumb}>
                    <BreadCrumb items={handleBreadCrumb()}/>
                </div>
                <div className={styles.function}>
                    <span>共{getallproduct?.productinfo.length}項結果</span>
                    <span>依最新項目排序</span>
                </div>
                <div className={styles.display}>
                    {
                        getallproduct?.productinfo.map((info: I_productinfo) => {
                            return <Item key={info.p_id} info={info}/>
                        })
                    }
                </div>
            </div>
    );
}

export default memo(Body);
