import { call, put, all, StrictEffect, takeEvery } from 'redux-saga/effects';
import fetchAPI from '@utils/fetchAPI';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import domain from '@utils/domainByEnv';

// 網域domain路徑
// 目前只有 提供json 檔, 之後再拿api 做替換

function* fetch_getlistshipping(action: any): Generator<StrictEffect, any, any> {
    yield put(actions.setIsLoading(true));
    const data = yield call(fetchAPI, {
        url: `${domain()}/order/listshipping`,
        req: action.payload,
    });

    yield put(actions.set_listshipping({...data}));
    yield put(actions.setIsLoading(false));
}

function* watchgetlistshipping() {
    yield takeEvery(actionTypes.CALL_LISTSHIPPING, fetch_getlistshipping);
}

export default function* rootSaga() {
    yield all([
        watchgetlistshipping(),
    ]);
}

