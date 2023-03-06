import * as actionTypes from './actionTypes';
import { E_Page } from './interfaces';

export const setBusSeatInfo = (payload: any) => ({
    type: actionTypes.SET_BUSSEATINFO,
    payload,
});

export const setBusSeatInfoSUCCESS = (payload: any) => ({
    type: actionTypes.SET_BUSSEATINFO_SUCCESS,
    payload,
});

export const setPage = (payload: E_Page) => ({
    type: actionTypes.SET_PAGE,
    payload,
})
