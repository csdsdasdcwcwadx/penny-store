import * as actionTypes from './actionTypes';
import { I_Tourists, I_PassengerPurpose, I_RootState } from './interfaces';

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

interface I_setSeatType {
    type: typeof actionTypes.SET_Seat_TYPE;
    payload: {
        idx?: number;
        type?: string;
        text?: string;
        row?: number;
        col?: number;
    };
}

interface I_GoNext {
    OrderID: string;
    CarNo: string;
    BusGType: string;
}

interface I_Seat {
    Seq: string;
    SeatNumber: string;
}

export interface I_changeSeat {
    OrderID: string;
    CarNo: string;
    BusGType: string;
    BusPassengerList: I_Seat[];
}

interface I_changeSeatSuccess {
    Result: null;
    Message: string;
}

export const setBusSeatInfo = (payload: I_CarData) => ({
    type: actionTypes.SET_BUSSEATINFO,
    payload,
});

export const setBusSeatInfoSUCCESS = (payload: any) => ({
    type: actionTypes.SET_BUSSEATINFO_SUCCESS,
    payload,
});

export const setSeatType = (
    idx: number,
    type: string,
    text: string,
    row: number,
    col: number
): I_setSeatType => ({
    type: actionTypes.SET_Seat_TYPE,
    payload: {
        idx,
        type,
        text,
        row,
        col,
    },
});

// 將 busSeatInfoAction 輸出出去
export type I_BusSeatInfoAction = ReturnType<typeof setBusSeatInfo>;

//傳遞人數資料
export const sumOfPeople = (payload: number) => ({
    type: actionTypes.NUM_OF_PEOPLE,
    payload,
});

// 決定BusSeatSelectPage是否開啟
export const open_BusSeatSelect = (payload: boolean) => ({
    type: actionTypes.OPEN_BUSSEATSELECT,
    payload,
});

//座位資料存入reducer
export const Fetch_SeatList = (payload: I_RootState) => ({
    type: actionTypes.FETCH_SEATLIST,
    payload,
});

//透過/order/getbusinfojson 拿取request
export const PassengerPurpose = (payload: { OrderID: string }) => ({
    type: actionTypes.PASSENGERPURPOSE,
    payload,
});

//透過/order/getbusinfojson 拿取
export const FetchPassengerPurpose = (payload: I_PassengerPurpose) => ({
    type: actionTypes.FETCH_PASSENGERPURPOSE,
    payload,
});

//透過/order/getbusseatlistjson 拿取request
export const BusSeatListPurpose = (payload: { OrderID: string; CarNo: string }) => ({
    type: actionTypes.BUSSEATLISTPURPOSE,
    payload,
});

//跳至下一頁/order/submitbusseatsjson
export const goNext = (payload: I_GoNext) => ({
    type: actionTypes.GO_NEXT,
    payload,
});
