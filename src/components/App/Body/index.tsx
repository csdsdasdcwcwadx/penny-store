import React, { memo } from 'react';
import styles from './styles.module.scss';
import BreadCrumb from '../../Common/BreadCrumb';
import Item from '@components/App/Item';
import { RootState } from '@Redux/App/store';
import { E_Page } from '@Redux/App/interfaces';
import { useSelector } from 'react-redux';

interface I_image {
    name: string;
    src: string;
}

function Body() {
    const images = require.context('../../imgs', false, /\.(png|jpe?g|svg)$/);
    const { page } = useSelector((store: RootState)=>store);

    const handleType = (type: E_Page)=>{
        switch(type) {
            case E_Page.HOME:
                return 'Home';
            case E_Page.SHOPALL:
                return '全部商品 | SHOP_ALL';
            case E_Page.SALE:
                return '優惠專區 | SALE';
            case E_Page.RESTOCK:
                return '熱騰騰現貨 | RESTOCK';
            case E_Page.WEAR:
                return '穿搭筆記本 | WEAR';
            case E_Page.MORE:
                return '更多';
        }
    }

    const imageList = images.keys().map((imageName) => ({
        name: imageName.replace('./', ''),
        src: images(imageName),
    }));
    return (
        <div className={styles.Body}>
            <div className={styles.title}>{handleType(page)}</div>
            <div className={styles.breadcrumb}>
                <BreadCrumb/>
            </div>
            <div className={styles.function}>
                <span>顯示第1至12項結果，共28項</span>
                <span>依最新項目排序</span>
            </div>
            <div className={styles.display}>
                {
                    imageList.map((img: I_image)=>{
                        return <Item key={img.name} img={img}/>
                    })
                }
            </div>
        </div>
    );
}

export default memo(Body);
