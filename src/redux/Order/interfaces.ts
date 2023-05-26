import { E_Page } from "@Redux/App/interfaces";

export interface I_RootState {
    ordershipping?: I_listshipping;
    openDetail?: string;
}

export interface I_listshipping {
    status: boolean;
    message: string;
    orderinfo: Array<Array<I_orderinfo>>;
    pages: number;
}

export interface I_orderinfo {
    m_id: string;
    p_id: string;
    o_id: string;
    o_date: string;
    o_amount: number;
    o_price: number;
    o_payment: number;
    o_dentical: string;
    p_name: string;
    p_amount: number;
    p_price: number;
    p_img: {
        data: Array<any>;
        type: string;
    };
    p_type: E_Page;
    p_size: string;
    p_dentical: string;
    p_info: string;
}

