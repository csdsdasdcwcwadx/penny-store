
import { call, put, all, StrictEffect, takeEvery } from 'redux-saga/effects';
import fetchAPI from '@utils/fetchAPI';
import DomainByEnv from '@utils/domainByEnv';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
// 網域domain路徑
// 目前只有 提供json 檔, 之後再拿api 做替換
const orderRoute = `${DomainByEnv()}/order`;


//取得座位表
function* fetch_getbusseatlistjson(action: any): Generator<StrictEffect, any, any> {
    const data = yield call(fetchAPI, {
        url: `${orderRoute}/getbusseatlistjson`,
        req: action.payload,
    });

    yield put(actions.setBusSeatInfoSUCCESS(data));
}

// 使用 type 註冊 saga function
// 使用時 呼叫 dispatch({type: })
function* watchSetBusSeatInfo() {
    yield takeEvery(actionTypes.SET_BUSSEATINFO, fetch_getbusseatlistjson);
}

export default function* rootSaga() {
    yield all([watchSetBusSeatInfo()]);
}
