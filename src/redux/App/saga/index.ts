
import { call, put, all, StrictEffect, takeEvery } from 'redux-saga/effects';
import fetchAPI from '@utils/fetchAPI';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import domain from '@utils/domainByEnv';

// 網域domain路徑
// 目前只有 提供json 檔, 之後再拿api 做替換

function* fetch_getallproduct(action: any): Generator<StrictEffect, any, any> {
    yield put(actions.setIsLoading(true));
    const data = yield call(fetchAPI, {
        url: `${domain()}/product/getallproduct`,
        req: action.payload,
    });
    yield put(actions.set_getallproduct(data));
    yield put(actions.setIsLoading(false));
}

function* watch_getallproduct() {
    yield takeEvery(actionTypes.CALL_PRODUCT_GETALLPRODUCT, fetch_getallproduct);
}

export default function* rootSaga() {
    yield all([
        watch_getallproduct(),
    ]);
}
