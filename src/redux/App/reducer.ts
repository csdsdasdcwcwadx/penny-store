import * as actionTypes from './actionTypes';
import { E_Page, I_AppState } from './interfaces';

const url = new URL (window.location.href);
const page_id = url.searchParams.get('page_id');

const initialState: I_AppState = {
    page: page_id === '' || page_id ? page_id as E_Page : E_Page.HOME,
    isLoading: true,
};

export default function reducer(State = initialState, action: any) {
    switch (action.type) {

        case actionTypes.SET_PRODUCT_GETALLPRODUCT:
            return {...State, getallproduct: action.payload};
        
        case actionTypes.SET_PAGE:
            return {...State, page: action.payload};

        case actionTypes.SET_ISLOADING:
            return {...State, isLoading: action.payload};

        default:
            return State;
    }
}