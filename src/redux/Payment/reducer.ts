import * as actionTypes from './actionTypes';
import { I_RootState } from './interface';

const initialState: I_RootState = {

};

export default function reducer(State = initialState, action: any) {
    switch (action.type) {
        default:
            return State;
    }
}