const init: any = {};

export default function TestReducers(State = init, action: any) {
    switch (action.type) {
        case 'TEST':
            return action.payload;

        default:
            return State;
    }
}
