
export interface I_RootState {
    productdetail?: I_productdetail
}

export interface I_productdetail {
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