import * as actionTypes from './actionTypes';
import { I_RootState } from './interfaces';

const initialState: I_RootState = {
    CarData: [],
};

export default function reducer(State = initialState, action: any) {
    switch (action.type) {
        case actionTypes.SET_BUSSEATINFO_SUCCESS:
            return action.payload;

        default:
            return State;
    }
}