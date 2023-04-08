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
}

export interface I_getallproduct {
    message: string;
    status: boolean;
    productinfo: Array<I_productinfo>;
}

export interface I_productinfo {
    p_id: string;
    p_name: string;
    p_price: number;
    p_amount: number;
    p_img: {
        data: Array<any>;
        type: string;
    };
    p_type: string;
}

export interface I_member {
    message: string;
    status: boolean;
    memberinfo: Array<I_memberinfo>;
}

export interface I_memberinfo {
    isAdmin: number;
    m_address: string;
    m_email: string;
    m_id: string;
    m_name: string;
    m_phone: string;
}