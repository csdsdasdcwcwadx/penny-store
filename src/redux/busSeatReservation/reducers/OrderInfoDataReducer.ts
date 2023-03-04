import { I_PassengerPurpose } from '../interfaces';
import { FETCH_PASSENGERPURPOSE } from '../actionTypes';

const initState: I_PassengerPurpose = {
    OrderID: '',
    GroupID: '',
    TourName: '',
    GoDate: '',
    BackDate: '',
    TourDays: 0,
    BusGType: '',
    CarList: [
        {
            csm00_csno: '',
            csm00_cartype: '',
            csm00_bdt: '',
            ImgName: '',
            ImgNameList: [''],
        },
    ],
    PassengerList: [],
    Message: '',
};

export default function OrderInfoDataReducer(State = initState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case 'set_OrderInfoDataReducer':
            return payload;
        default:
            return State;
    }
}
