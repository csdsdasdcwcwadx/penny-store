import { I_getallproduct } from "@Redux/App/interfaces"
import { I_listshipping } from "@Redux/Order/interfaces";
import { I_productinfo } from "@Redux/Product/interface";

export interface I_RootState {
    productdetail?: I_getallproduct;
    isLoading: boolean;
    orderdetail?: I_listshipping;
    productdata?: I_productdata;
}

interface I_productdata {
    message: string;
    status: boolean;
    productdatainfo: Array<I_productdatainfo>;
}

interface I_productdatainfo extends I_productinfo {
    p_id: string;
    adding: number;
    buys: number;
    click: number;
}