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