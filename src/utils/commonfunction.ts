import notFoundIMG from '../imgs/notfound.jpg';
import { E_Page } from '@Redux/App/interfaces';

export const handleIMG = (img: {data: Array<any>, type: string} | null) => {
    if(img) return URL.createObjectURL(new Blob([Buffer.from(img.data)], { type: 'image/jpeg' }));
    else return notFoundIMG;
}

export const handleNavigator = (type: E_Page) => {
    switch(type) {

        case E_Page.ACCESSORIES:
            return "配件";
        case E_Page.HOME:
            return "全部商品";
        case E_Page.TOPPING:
            return "上衣";
        case E_Page.BOTTOM:
            return "下身";
        case E_Page.SKIRT:
            return "裙子";
        default:
            return "找不到名稱";
    }

}   