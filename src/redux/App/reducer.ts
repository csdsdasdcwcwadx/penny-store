import * as actionTypes from './actionTypes';
import { E_Page, I_AppState } from './interfaces';

const initialState: I_AppState = {
    page: E_Page.HOME,
};

export default function reducer(State = initialState, action: any) {
    switch (action.type) {

        case actionTypes.SET_BUSSEATINFO_SUCCESS:
            return action.payload;
        
        case actionTypes.SET_PAGE:
            return {...State, page: action.payload}

        default:
            return State;
    }
}