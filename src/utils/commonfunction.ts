import notFoundIMG from '../imgs/notfound.jpg';
import { E_Page } from '@Redux/Common/interfaces';

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

export const handleInputBar = (type: string, input: string) => {
    const RegexNumTypes = /^[0-9]*$/;
    const RegexChineseTypes = /^[^\u4e00-\u9fa5]+$/;
    const RegexPhoneNum = /^09\d{8}$/;
    const RegexDecimalPoint = /^(\d{0,4})(\.\d{1,2})?$/;
    const Regexmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let msg;
    switch(type) {
        // 手機驗證，不為空、為數字、為手機格式
        case 'phone':
            if(!RegexPhoneNum.test(input)) {
                msg = '此欄位須為手機格式';
            }
            if(!RegexNumTypes.test(input)) {
                msg = '此欄位須為數字';
            }
            if(input === '') {
                msg = '此欄位必填';
            }
            break;
        case 'name':
        case 'address':
            if(input === '') {
                msg = '此欄位必填'
            }
            break;
        case 'email':
            if(!Regexmail.test(input)) {
                msg = '此欄位須為信箱格式';
            }
            if(input === '') {
                msg = '此欄位必填';
            }
            break;
        default:
            break;
    }
    return msg;
}