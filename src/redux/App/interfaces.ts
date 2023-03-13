export interface I_AppState {
    page: E_Page;
    getallproduct?: I_getallproduct;
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
    p_img: any;
    p_type: string;
}