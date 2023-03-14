import * as actionTypes from './actionTypes';

// 呼叫product_getdetail
export const call_getdetailproduct = (payload: any) => ({
    type: actionTypes.CALL_PRODUCT_GETDETAIL,
    payload,
});

// 將product_getdetail寫進redux
export const set_getdetailproduct = (payload: any) => ({
    type: actionTypes.SET_PRODUCT_GETDETAIL,
    payload,
});