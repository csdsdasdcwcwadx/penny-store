import React, { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import BreadCrumb from '../../Common/Modules/BreadCrumb';
import Item from '@components/App/Item';
import { RootState } from '@Redux/App/store';
import { useSelector, useDispatch } from 'react-redux';
import { call_getallproduct } from '@Redux/App/actions';
import { I_productinfo } from '@Redux/Product/interface';
import Spinner from '@components/Common/Modules/Spinner';
import { handleNavigator } from '@utils/commonfunction';
import { handlepath } from '@utils/domainByEnv';
import PageNumber from '@components/Common/PageNumber';
import { E_Page } from '@Redux/App/interfaces';

let prePage: E_Page;
function Body() {
    const { page, getallproduct, isLoading } = useSelector((store: RootState)=>store);
    const [ serial, setSerial ] = useState(1);
    const dispatch = useDispatch();

    useEffect (() => {
        const url = new URL (window.location.href);
        const page_id = url.searchParams.get('page_id');
        // 從其他分頁過來
        if(page_id === '' || page_id) {
            window.history.pushState({}, '', window.location.href.split('?')[0]);
            dispatch(call_getallproduct({p_type: page_id, currpage: 1}));
        }else{
            // 從當前頁面選取類別
            if(prePage !== page) {
                dispatch(call_getallproduct({p_type: page, currpage: 1}));
                prePage = page;
                setSerial(1);
            }else{
                dispatch(call_getallproduct({p_type: page, currpage: serial}));
            }
        }
    },[dispatch, page, serial])

    const handleBreadCrumb = () => {
        const menu = {name: '首頁', href: `${handlepath()}?page_id=`}
        return [menu, {name: handleNavigator(page), href: ''}];
    }

    return (
        isLoading ? <Spinner/> :
            <div className={styles.Body}>
                <div className={styles.title}>{getallproduct && handleNavigator(page)}</div>
                <div className={styles.breadcrumb}>
                    <BreadCrumb items={handleBreadCrumb()}/>
                </div>
                <div className={styles.function}>
                    <span>共{getallproduct?.productinfo.length}項結果</span>
                    {/* <span>依最新項目排序</span> */}
                </div>
                <div className={styles.display}>
                    {
                        getallproduct?.productinfo.map((info: I_productinfo, ind) => {
                            return <Item key={info.p_id} info={info}/>
                        })
                    }
                </div>
                    {
                        getallproduct?.pages ? <PageNumber serial={serial} setSerial={setSerial} maxpage={getallproduct.pages}/> : ''
                    }
            </div>
    );
}

export default memo(Body);
