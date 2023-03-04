import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import carData from './reducers/BusSeatJson';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import SwitchReducer from './reducers/SwitchBusSeatSelect';
import OrderInfoDataReducer from './reducers/OrderInfoDataReducer';
import isSelectingReducer from './reducers/isSelecting';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        carData,
        SwitchReducer,
        OrderInfoDataReducer,
        isSelectingReducer,
    },
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
