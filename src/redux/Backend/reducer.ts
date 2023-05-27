import * as actionTypes from './actionTypes';
import { I_RootState } from './interface';

const initialState: I_RootState = {
    isLoading: true,
};

export default function reducer(State = initialState, action: any) {
    switch (action.type) {

        case actionTypes.SET_PRODUCT_GETALLPRODUCT:
            return {...State, productdetail: action.payload};
        case actionTypes.SET_ISLOADING:
            return {...State, isLoading: action.payload};
        case actionTypes.SET_ORDER_LISTSHIPPING:
            return {...State, orderdetail: action.payload};
        default:
            return State;
    }
}