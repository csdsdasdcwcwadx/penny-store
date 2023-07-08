import notFoundIMG from '../imgs/notfound.jpg';
import { E_Page } from '@Redux/App/interfaces';

export const handleIMG = (img: {data: Array<any>, type: string} | null) => {
    if(img) return URL.createObjectURL(new Blob([Buffer.from(img.data)], { type: 'image/jpeg' }));
    else return notFoundIMG;
}

export const handleNavigator = (type: E_Page) => {
    switch(type) {

        case E_Page.ACCESSORIES:
            return "配件 ACCESSORIES";
        case E_Page.HOME:
            return "全部商品";
        case E_Page.TOPPING:
            return "上身 TOP";
        case E_Page.BOTTOM:
            return "下著 BOTTOM";
        case E_Page.SKIRT:
            return "洋裝 DRESS";
        case E_Page.LUXURY:
            return "精品 LUXURIES";
        default:
            return "找不到名稱";
    }

}

export const handlePayment = (payment: number) => {
    return payment === 1 ? '已付款' : '尚未付款';
}

export const handleShipment = (isShip: number) => {
    return isShip === 1 ? '已出貨(約15-20個工作天送達)' : '尚未出貨';
}

export const handleDate = (date: string, isTime: boolean = false) => {
    const utcDateTime = date;
    const localDateTime = new Date(utcDateTime).toLocaleString('en-US', { timeZone: 'Asia/Taipei', hour12: false });
    if(isTime) return localDateTime.split(',')[1];
    return localDateTime.split(',')[0];
}

export const handleIsOff = (isoff: number, reverse: boolean = false) => {
    if(reverse) return isoff === 1 ? '上架' : '下架';
    else return isoff === 1 ? '已下架' : '已上架';
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const handleDistribution = (distribute: number) => {
    return distribute === 0 ? '同時出貨': '分批出貨'
}