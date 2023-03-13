import React, { memo, useEffect } from 'react';
import styles from './styles.module.scss';
import BreadCrumb from '../../Common/BreadCrumb';
import Item from '@components/App/Item';
import { RootState } from '@Redux/App/store';
import { useSelector, useDispatch } from 'react-redux';
import { call_getallproduct } from '@Redux/App/actions';
import { I_productinfo } from '@Redux/App/interfaces';

function Body() {
    const { page, getallproduct } = useSelector((store: RootState)=>store); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(call_getallproduct({p_type: page}));
    },[dispatch, page])

    return (
        <div className={styles.Body}>
            <div className={styles.title}>{page}</div>
            <div className={styles.breadcrumb}>
                <BreadCrumb/>
            </div>
            <div className={styles.function}>
                <span>顯示第1至12項結果，共28項</span>
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
