import * as actionTypes from './actionTypes';

interface I_CarData {
    CarData?: Array<Object>;

    CarTypeName?: string;
    CarTypeDescription?: string;
    CarTypeCode?: string;
    CarNumber?: number | null;
    Seats?: Array<Array<object>>;

    idx?: number;
    type?: string;
    text?: string;
    row?: number;
    col?: number;
}

export const setBusSeatInfo = (payload: I_CarData) => ({
    type: actionTypes.SET_BUSSEATINFO,
    payload,
});

export const setBusSeatInfoSUCCESS = (payload: any) => ({
    type: actionTypes.SET_BUSSEATINFO_SUCCESS,
    payload,
});
