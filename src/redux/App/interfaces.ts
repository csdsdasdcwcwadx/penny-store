import { I_productinfo } from "@Redux/Product/interface";

export interface I_AppState {
    page: E_Page;
    getallproduct?: I_getallproduct;
    isLoading: boolean;
}

export enum E_Page {
    HOME = '',
    TOPPING = 'TOPPING',
    BOTTOM = 'BOTTOM',
    SKIRT = 'SKIRT',
    ACCESSORIES = 'ACCESSORIES',
    LUXURY = 'LUXURY',
}

export interface I_getallproduct {
    message: string;
    status: boolean;
    productinfo: Array<I_productinfo>;
    pages: number
}

export interface I_member {
    message: string;
    status: boolean;
    memberinfo: Array<I_memberinfo>;
}

export interface I_memberinfo {
    m_address: string;
    m_email: string;
    m_id: string;
    m_name: string;
    m_phone: string;
}