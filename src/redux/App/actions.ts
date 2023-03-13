import * as actionTypes from './actionTypes';
import { E_Page } from './interfaces';

export const setPage = (payload: E_Page) => ({
    type: actionTypes.SET_PAGE,
    payload,
});

// 呼叫 product/getallproduct
export const call_getallproduct = (payload: any) => ({
    type: actionTypes.CALL_PRODUCT_GETALLPRODUCT,
    payload,
})

// product/getallproduct寫進redux
export const set_getallproduct = (payload: any) => ({
    type: actionTypes.SET_PRODUCT_GETALLPRODUCT,
    payload,
})
