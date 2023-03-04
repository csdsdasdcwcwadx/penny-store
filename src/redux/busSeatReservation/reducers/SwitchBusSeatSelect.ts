import { OPEN_BUSSEATSELECT } from '../actionTypes';

const init = false;

export default function BusSeatSelectReducer(State = init, action: any) {
    const { type, payload } = action;

    switch (type) {
        case OPEN_BUSSEATSELECT:
            return payload;
        default:
            return State;
    }
}
