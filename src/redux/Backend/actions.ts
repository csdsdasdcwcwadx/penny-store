import * as actionTypes from './actionTypes';

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

export const call_listshipping = (payload: any) => ({
    type: actionTypes.CALL_ORDER_LISTSHIPPING,
    payload,
})

export const set_listshipping = (payload: any) => ({
    type: actionTypes.SET_ORDER_LISTSHIPPING,
    payload,
})

export const setIsLoading = (payload: boolean) => ({
    type: actionTypes.SET_ISLOADING,
    payload,
})

export const call_getalldata = (payload: any) => ({
    type: actionTypes.CALL_PRODUCT_GETALLDATA,
    payload,
})

export const set_getalldata = (payload: any) => ({
    type: actionTypes.SET_PRODUCT_GETALLDATA,
    payload,
})