import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import * as React from 'react';
import { createDispatchHook, createSelectorHook } from 'react-redux';
import pageReducer from './Page/reducer';
// import ItinerariesSaga from '@Redux/tourdetail/Itineraries/saga';
import createSagaMiddleware from 'redux-saga';

// function* rootSaga() {
//     yield all(ItinerariesSaga);
// }

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        pageReducer,
    },
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
});
// sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
