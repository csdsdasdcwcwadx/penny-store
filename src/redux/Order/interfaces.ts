import { E_Page } from "@Redux/App/interfaces";

export interface I_RootState {
    ordershipping?: I_listshipping;
    openDetail?: string;
    isLoading: boolean;
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
    isShip: number;
    o_name: string;
    o_phone: string;
    o_address: string;
    o_img: {
        data: Array<any>;
        type: string;
    };
    o_size: string;
    op_name: string;
    o_color: string;
    o_distributed: number;
}

