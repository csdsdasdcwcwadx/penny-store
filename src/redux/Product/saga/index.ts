
import { call, put, all, StrictEffect, takeEvery } from 'redux-saga/effects';
import fetchAPI from '@utils/fetchAPI';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
import domain from '@utils/domainByEnv';

// 網域domain路徑
// 目前只有 提供json 檔, 之後再拿api 做替換

function* fetch_getdetailproduct(action: any): Generator<StrictEffect, any, any> {
    const data = yield call(fetchAPI, {
        url: `${domain()}/product/getdetailproduct`,
        req: action.payload,
    });

    yield put(actions.set_getdetailproduct({...data}));
}

function* watchgetdetailproduct() {
    yield takeEvery(actionTypes.CALL_PRODUCT_GETDETAIL, fetch_getdetailproduct);
}

export default function* rootSaga() {
    yield all([
        watchgetdetailproduct(),
    ]);
}