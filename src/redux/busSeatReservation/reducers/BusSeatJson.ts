import { I_RootState } from '../interfaces';
import * as actionTypes from '../actionTypes';

// 取得url 的query data
// const TravelPavilionGroupID = new URLSearchParams(window.location.search).get('TravelPavilionGroupID');

const initialState: I_RootState = {
    CarData: [],
};

export default function BusSeatJsonReducer(State = initialState, action: any) {
    switch (action.type) {
        case actionTypes.FETCH_SEATLIST:
            return action.payload;

        default:
            return State;
    }
}
