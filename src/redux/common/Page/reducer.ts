import * as actionTypes from './actionTypes';
import { I_Page } from './interfaces';

const initialState: I_Page = {
    curPage: 'detail',
};

const pageReducer = (state: I_Page = initialState, action: any): I_Page => {
    let newState = { ...state };

    switch (action.type) {
        case actionTypes.SET_PAGE_TYPE:
            return { ...state, curPage: action.payload };

        default:
            return newState;
    }
};

export default pageReducer;
