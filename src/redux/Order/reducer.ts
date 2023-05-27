import * as actionTypes from './actionTypes';
import { I_RootState } from './interfaces';

const initialState: I_RootState = {
    isLoading: true,
};

export default function reducer(State = initialState, action: any) {
    switch (action.type) {
        case actionTypes.SET_LISTSHIPPING:
            return {...State, ordershipping: action.payload};
        case actionTypes.SET_OPENDETAIL:
            return {...State, openDetail: action.payload};
        case actionTypes.SET_ISLOADING:
            return {...State, isLoading: action.payload};

        default:
            return State;
    }
}