
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

function* fetch_listshipping(action: any): Generator<StrictEffect, any, any> {
    yield put(actions.setIsLoading(true));
    const data = yield call(fetchAPI, {
        url: `${domain()}/order/listshipping`,
        req: action.payload,
    });
    yield put(actions.set_listshipping(data));
    yield put(actions.setIsLoading(false));
}

function* watch_listshipping() {
    yield takeEvery(actionTypes.CALL_ORDER_LISTSHIPPING, fetch_listshipping);
}

function* fetch_getalldata(action: any): Generator<StrictEffect, any, any> {
    const data = yield call(fetchAPI, {
        url: `${domain()}/product/productgetalldata`,
        req: action.payload,
    });
    yield put(actions.set_getalldata(data));
}

function* watch_getalldata() {
    yield takeEvery(actionTypes.CALL_PRODUCT_GETALLDATA, fetch_getalldata);
}

export default function* rootSaga() {
    yield all([
        watch_getallproduct(),
        watch_listshipping(),
        watch_getalldata(),
    ]);
}