import * as actionTypes from './actionTypes';

export const call_listshipping = (payload: any) => ({
    type: actionTypes.CALL_LISTSHIPPING,
    payload,
})

export const set_listshipping = (payload: any) => ({
    type: actionTypes.SET_LISTSHIPPING,
    payload,
})

export const set_opendetail = (payload: any) => ({
    type: actionTypes.SET_OPENDETAIL,
    payload,
})

export const setIsLoading = (payload: boolean) => ({
    type: actionTypes.SET_ISLOADING,
    payload,
})