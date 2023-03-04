import * as actionTypes from '../actionTypes';

const initState = { Seq: null, Name: null, SeatNumber: null};

//邏輯可能要修改
export default function isSelecting(State = initState, action: any) {
    switch (action.type) {
        case actionTypes.SELECTING:
            return action.payload;

        default:
            return State;
    }
}
